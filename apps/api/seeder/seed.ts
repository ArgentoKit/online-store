import * as dotenv from 'dotenv'
import { faker } from '@faker-js/faker'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Product } from '../generated/prisma/client'

dotenv.config()
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

const createProducts = async (quantity: number) => {
  const products: Product[] = []

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName()
    const categoryName = faker.commerce.department()

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName.toLowerCase()),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
        images: Array.from({ length: faker.number.int({ min: 2, max: 6 }) }).map(() => faker.image.url()),
        category: {
          create: {
            name: categoryName,
            slug: faker.helpers.slugify(categoryName.toLowerCase()),
          },
        },
        reviews: {
          create: {
            rating: faker.number.int({ min: 1, max: 5 }),
            text: faker.lorem.sentences(2),
            user: {
              connect: {
                id: 1,
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
  await createProducts(10)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    console.log('Done seeding database.')
    await prisma.$disconnect()
  })
