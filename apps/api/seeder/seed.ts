import { faker } from '@faker-js/faker'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import { AttributeTypeEnum, PrismaClient, Product, UnitEnum } from '../generated/prisma/client'

dotenv.config()
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

interface AttributeTemplate {
  name: string
  slug: string
  type: AttributeTypeEnum
  unit?: UnitEnum
  step?: number
  values?: string[]
  range?: { min: number; max: number; step: number }
}

const ATTRIBUTE_TEMPLATES: AttributeTemplate[] = [
  {
    name: 'Color',
    slug: 'color',
    type: 'MULTISELECT',
    values: ['Red', 'Blue', 'Black', 'White', 'Green', 'Yellow', 'Gray', 'Pink', 'Purple', 'Orange'],
  },
  {
    name: 'Size',
    slug: 'size',
    type: 'MULTISELECT',
    values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    name: 'Material',
    slug: 'material',
    type: 'MULTISELECT',
    values: ['Cotton', 'Polyester', 'Leather', 'Metal', 'Plastic', 'Wood', 'Glass', 'Silicone'],
  },
  {
    name: 'Brand',
    slug: 'brand',
    type: 'MULTISELECT',
    values: ['Acme', 'Zenith', 'Nova', 'Vertex', 'Orbit', 'Pulse', 'Quantum', 'Titan'],
  },
  {
    name: 'Weight',
    slug: 'weight',
    type: 'RANGE',
    unit: 'KG',
    step: 0.1,
    range: { min: 0.1, max: 20, step: 0.1 },
  },
  {
    name: 'Storage Capacity',
    slug: 'storage-capacity',
    type: 'MULTISELECT',
    unit: 'GB',
    values: ['32', '64', '128', '256', '512', '1024'],
  },
  {
    name: 'Screen Size',
    slug: 'screen-size',
    type: 'RANGE',
    unit: 'INCH',
    step: 0.1,
    range: { min: 4, max: 85, step: 0.1 },
  },
  {
    name: 'RAM',
    slug: 'ram',
    type: 'MULTISELECT',
    unit: 'GB',
    values: ['2', '4', '6', '8', '12', '16', '32', '64'],
  },
  {
    name: 'Battery Capacity',
    slug: 'battery-capacity',
    type: 'RANGE',
    unit: 'MAH',
    step: 100,
    range: { min: 1000, max: 10000, step: 100 },
  },
  {
    name: 'Warranty Period',
    slug: 'warranty-period',
    type: 'MULTISELECT',
    values: ['6 Months', '1 Year', '2 Years', '3 Years', '5 Years'],
  },
  {
    name: 'Discount',
    slug: 'discount',
    type: 'RANGE',
    unit: 'PERCENT',
    step: 1,
    range: { min: 0, max: 70, step: 1 },
  },
  {
    name: 'Processor Speed',
    slug: 'processor-speed',
    type: 'RANGE',
    unit: 'GHZ',
    step: 0.1,
    range: { min: 1, max: 5, step: 0.1 },
  },
]

interface AttributeRuntime {
  id: string
  type: AttributeTypeEnum
  valueIds: string[]
  range?: { min: number; max: number; step: number }
}

const attributesBySlug = new Map<string, AttributeRuntime>()

const attributeIdToSlug = new Map<string, string>()

const rangeValueCache = new Map<string, Map<string, string>>()

const seedAttributes = async () => {
  for (const template of ATTRIBUTE_TEMPLATES) {
    let attribute = await prisma.attribute.findFirst({
      where: { slug: template.slug },
    })

    if (!attribute) {
      attribute = await prisma.attribute.create({
        data: {
          name: template.name,
          slug: template.slug,
          type: template.type,
          unit: template.unit,
          step: template.step,
        },
      })
    }

    const valueIds: string[] = []

    if (template.values) {
      const existingValues = await prisma.attributeValue.findMany({
        where: { attributeId: attribute.id },
      })
      const existingIdByValue = new Map(existingValues.map((v) => [v.value, v.id]))

      for (const value of template.values) {
        const existingId = existingIdByValue.get(value)
        if (existingId) {
          valueIds.push(existingId)
          continue
        }

        const created = await prisma.attributeValue.create({
          data: { value, attributeId: attribute.id },
        })
        valueIds.push(created.id)
      }
    }

    attributesBySlug.set(template.slug, {
      id: attribute.id,
      type: template.type,
      valueIds,
      range: template.range,
    })
    attributeIdToSlug.set(attribute.id, template.slug)
  }
}

const getOrCreateRangeValueId = async (slug: string, rawValue: number) => {
  const attribute = attributesBySlug.get(slug)!
  const { step } = attribute.range!

  const rounded = Math.round(rawValue / step) * step
  const decimals = step < 1 ? (String(step).split('.')[1]?.length ?? 1) : 0
  const value = rounded.toFixed(decimals)

  if (!rangeValueCache.has(slug)) rangeValueCache.set(slug, new Map())
  const cache = rangeValueCache.get(slug)!

  const cached = cache.get(value)
  if (cached) return cached

  const existing = await prisma.attributeValue.findFirst({
    where: { attributeId: attribute.id, value },
  })
  if (existing) {
    cache.set(value, existing.id)
    return existing.id
  }

  const created = await prisma.attributeValue.create({
    data: { value, attributeId: attribute.id },
  })
  cache.set(value, created.id)
  return created.id
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

interface CategoryRuntime {
  id: string
  attributeSlugs: string[]
}

const categoriesBySlug = new Map<string, CategoryRuntime>()

const getOrCreateCategory = async (name: string, slug: string) => {
  const cached = categoriesBySlug.get(slug)
  if (cached) return cached

  const existing = await prisma.category.findUnique({
    where: { slug },
    include: { attributes: true },
  })

  if (existing) {
    const runtime: CategoryRuntime = {
      id: existing.id,
      attributeSlugs: existing.attributes
        .map((categoryAttribute) => attributeIdToSlug.get(categoryAttribute.attributeId))
        .filter((attributeSlug): attributeSlug is string => Boolean(attributeSlug)),
    }
    categoriesBySlug.set(slug, runtime)
    return runtime
  }

  const attributeCount = faker.number.int({ min: 3, max: 6 })
  const chosenTemplates = faker.helpers.arrayElements(ATTRIBUTE_TEMPLATES, attributeCount)

  const category = await prisma.category.create({
    data: {
      name,
      slug,
      attributes: {
        create: chosenTemplates.map((template, index) => ({
          attributeId: attributesBySlug.get(template.slug)!.id,
          isFilter: faker.datatype.boolean({ probability: 0.75 }),
          sortOrder: index,
        })),
      },
    },
  })

  const runtime: CategoryRuntime = {
    id: category.id,
    attributeSlugs: chosenTemplates.map((template) => template.slug),
  }
  categoriesBySlug.set(slug, runtime)
  return runtime
}

const buildProductAttributesData = async (attributeSlugs: string[]) => {
  const data: { attributeId: string; valueId: string }[] = []

  for (const slug of attributeSlugs) {
    const attribute = attributesBySlug.get(slug)!

    let valueId: string | undefined

    if (attribute.type === 'RANGE' && attribute.range) {
      const rawValue = faker.number.float({ min: attribute.range.min, max: attribute.range.max })
      valueId = await getOrCreateRangeValueId(slug, rawValue)
    } else if (attribute.valueIds.length > 0) {
      valueId = faker.helpers.arrayElement(attribute.valueIds)
    }

    if (valueId) {
      data.push({ attributeId: attribute.id, valueId })
    }
  }

  return data
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

const createProducts = async (quantity: number) => {
  const products: Product[] = []

  for (let i = 0; i < quantity; i++) {
    const productName = `${faker.commerce.productName()} ${faker.string.alphanumeric(4)}`
    const categoryName = faker.commerce.department()
    const categorySlug = faker.helpers.slugify(categoryName.toLowerCase())

    const category = await getOrCreateCategory(categoryName, categorySlug)
    const productAttributesData = await buildProductAttributesData(category.attributeSlugs)

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName.toLowerCase()),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
        images: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() =>
          faker.image.url({ width: 500, height: 500 })
        ),
        categories: {
          create: {
            category: {
              connect: { id: category.id },
            },
          },
        },
        attributes: {
          create: productAttributesData,
        },
        reviews: {
          create: {
            rating: faker.number.int({ min: 1, max: 5 }),
            text: faker.lorem.sentences(2),
            user: {
              connect: {
                id: 'cmskmd3tq0000lcoawor7739z',
              },
            },
          },
        },
      },
    })

    products.push(product)
  }
}

async function main() {
  console.log('Seeding database...')
  console.log('Seeding attributes...')
  await seedAttributes()
  console.log('Seeding products, categories and their attributes/filters...')
  await createProducts(10)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('Done seeding database.')
    await prisma.$disconnect()
  })
