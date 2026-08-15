import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { CategoryTreeService } from '@/shared/modules/category-tree.service'
import { generateSlug } from '@/utils/generate-slug'
import { CategoryDto } from './category.dto'
import { returnCategoryObject, returnCategoryObjectFullest } from './return-category.object'

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private categoryTreeService: CategoryTreeService
  ) {}

  private async getCategoryPriceRange(categoryId: string) {
    const categoryIds = await this.categoryTreeService.getCategoryIdsWithChildren(categoryId)
    const result = await this.prisma.product.aggregate({
      where: { categories: { some: { categoryId: { in: categoryIds } } } },
      _min: { price: true },
      _max: { price: true },
    })
    return { min: result._min.price ?? 0, max: result._max.price ?? 0 }
  }

  async byId(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: returnCategoryObject,
    })

    if (!category) throw new NotFoundException('Category not found')

    return category
  }

  async bySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: returnCategoryObjectFullest,
    })

    if (!category) throw new NotFoundException('Category not found')

    const priceRange = await this.getCategoryPriceRange(category.id)

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      filters: {
        attributes: category.attributes.map((ca) => ca.attribute),
        price: priceRange,
      },
    }
  }

  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject,
    })
  }

  async create(dto: CategoryDto) {
    if (dto.parentId) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: dto.parentId },
      })

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found')
      }
    }

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        parentId: dto.parentId || null,
      },
    })
  }

  async update(id: string, dto: CategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
      },
    })
  }

  async delete(id: string) {
    return this.prisma.category.delete({
      where: { id },
    })
  }
}
