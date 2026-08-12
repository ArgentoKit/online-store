import { CategoryService } from '@/entities/category/api/category.service'
import { ProductService } from '@/entities/product/api/product.service'

export const CategoryCatalogService = {
  async getCategoryData(slug: string) {
    const category = await CategoryService.getBySlug(slug)
    const products = await ProductService.getProductByCategory(slug, { page: 1, perPage: 20 })

    return {
      category,
      products,
    }
  },
}
