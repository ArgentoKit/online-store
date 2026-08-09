import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from 'generated/prisma/client'
import { PaginationDto } from '@/pagination/pagination.dto'
import { PaginationService } from '@/pagination/pagination.service'
import { PrismaService } from '@/prisma.service'
import { generateSlug } from '@/utils/generate-slug'
import { GetAllProductDto, ProductSortByEnum } from './dto/get-all-product.dto'
import { ProductDto } from './dto/product.dto'
import { returnProductObject, returnProductObjectFullest } from './return-product.object'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  async getAll(dto: GetAllProductDto) {
    const { sort, searchTerm } = dto

    const prismaSort: Prisma.ProductOrderByWithRelationInput = {}

    if (sort === ProductSortByEnum.LOW_PRICE) {
      prismaSort.price = 'asc'
    } else if (sort === ProductSortByEnum.HIGH_PRICE) {
      prismaSort.price = 'desc'
    } else if (sort === ProductSortByEnum.OLDEST) {
      prismaSort.createdAt = 'asc'
    } else {
      prismaSort.createdAt = 'desc'
    }

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              categories: {
                some: {
                  category: {
                    name: {
                      contains: searchTerm,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            },
            {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {}

    const { perPage, skip } = this.paginationService.getPagination(dto)

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: returnProductObject,
    })

    return {
      products,
      length: await this.prisma.product.count({
        where: prismaSearchTermFilter,
      }),
    }
  }

  async byId(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: returnProductObjectFullest,
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: returnProductObjectFullest,
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }

  async byCategorySlug(categorySlug: string, dto: PaginationDto) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      select: { id: true },
    })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    const categoryIds = await this.getCategoryIdsWithChildren(category.id)
    const { page, perPage, skip } = this.paginationService.getPagination(dto)

    const where: Prisma.ProductWhereInput = {
      categories: {
        some: { categoryId: { in: categoryIds } },
      },
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          slug: true,
          price: true,
          images: true,
        },
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      items,
      meta: this.paginationService.getMeta(total, page, perPage),
    }
  }

  async getCategoryIdsWithChildren(categoryId: string): Promise<string[]> {
    const cacheKey = `category-tree:${categoryId}`
    const cached = await this.cache.get<string[]>(cacheKey)
    if (cached) return cached

    const result = await this.prisma.$queryRaw<{ id: string }[]>`
      WITH RECURSIVE category_tree AS (
      SELECT id FROM "Category" WHERE id = ${categoryId}
      UNION ALL
      SELECT c.id FROM "Category" c
      INNER JOIN category_tree ct ON c.parent_id = ct.id
    )
    SELECT id FROM category_tree
    `
    const ids = result.map((r) => r.id)

    await this.cache.set(cacheKey, ids, 60 * 60 * 1000)
    return ids
  }

  async getSimilar(id: string) {
    const currentProduct = await this.byId(id)

    if (!currentProduct.categories || currentProduct.categories.length === 0) {
      return []
    }

    const categoryIds = currentProduct.categories.map((item) => item.categoryId)

    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categoryIds,
            },
          },
        },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: returnProductObject,
    })

    return products
  }

  async create(dto: ProductDto) {
    const { name, price, description, images, categoryIds } = dto

    const product = await this.prisma.product.create({
      data: {
        description,
        name,
        price,
        slug: generateSlug(name),
        images,
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
    })

    return product.id
  }

  async update(id: string, dto: ProductDto) {
    const { name, price, description, images, categoryIds } = dto

    await this.prisma.productCategory.deleteMany({
      where: { productId: id },
    })

    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        images,
        slug: generateSlug(name),
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
    })
  }

  async delete(id: string) {
    return this.prisma.product.delete({ where: { id } })
  }
}
