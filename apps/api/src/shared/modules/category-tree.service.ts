import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class CategoryTreeService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

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
}
