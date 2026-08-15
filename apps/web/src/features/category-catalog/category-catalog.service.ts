import { CategoryService } from '@/entities/category/api/category.service'
import { ProductService } from '@/entities/product/api/product.service'
import { ProductFilterDto } from '@/entities/product/types/product.interface'

export const CategoryCatalogService = {
  async getCategoryData(slug: string, filterDto: ProductFilterDto, attributeFilters: Record<string, string[]>) {
    const [category, products] = await Promise.all([
      CategoryService.getBySlug(slug),
      ProductService.getProductByCategory(slug, filterDto, attributeFilters),
    ])
    return { category, products }
  },
}
