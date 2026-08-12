import { CategoryService } from '@/entities/category/api/category.service'
import { ProductService } from '@/entities/product/api/product.service'
import { CategoryCatalogService } from '@/features/category-catalog/category-catalog.service'
import { CategoryPage } from '@/views/category'

interface CategoryRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { slug } = await params
  const { category, products } = await CategoryCatalogService.getCategoryData(slug)

  return <CategoryPage category={category} products={products} />
}
