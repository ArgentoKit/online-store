import { PaginationService } from '@/pagination/pagination.service'
import { PrismaService } from '@/prisma.service'
import { generateSlug } from '@/utils/generate-slug'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from 'generated/prisma/client'
import { GetAllProductDto, ProductSortByEnum } from './dto/get-all-product.dto'
import { ProductDto } from './dto/product.dto'
import { returnProductObject, returnProductObjectFullest } from './return-product.object'

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
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

    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm ? {
      OR: [
        {
          categories: {
            some: {
              category: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              }
            }
          }
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }
      ]
    } : {}

    const { perPage, skip } = this.paginationService.getPagination(dto)

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSort,
      skip,
      take: perPage,
      select: returnProductObject
    })

    return {
      products,
      length: await this.prisma.product.count({ 
        where: prismaSearchTermFilter 
      })
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

  async byCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: { 
        categories: {
          some: {
            category: {
              slug: categorySlug
            }
          }
        }
      },
      select: returnProductObjectFullest,
    })

    if (!products) {
      throw new NotFoundException('Product not found')
    }

    return products
  }

  async getSimilar(id: string) {
    const currentProduct = await this.byId(id)

    if (!currentProduct.categories || currentProduct.categories.length === 0) {
      return []
    }

    const categoryIds = currentProduct.categories.map(item => item.categoryId)

    const products = await this.prisma.product.findMany({
      where: {
        categories: {
          some: {
            categoryId: {
              in: categoryIds
            }
          }
        },
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: returnProductObject
    })

    return products
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        description: '',
        name: '',
        price: 0,
        slug: ''
      }
    })

    return product.id
  }

  async update(id: string, dto: ProductDto) {
    const { name, price, description, images, categoryIds } = dto

    await this.prisma.productCategory.deleteMany({
      where: { productId: id }
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
          create: categoryIds.map(categoryId => ({
            category: {
              connect: { id: categoryId }
            }
          }))
        }
      }
    })
  }

  async delete(id: string) {
    return this.prisma.product.delete({ where: { id } })
  }
}
