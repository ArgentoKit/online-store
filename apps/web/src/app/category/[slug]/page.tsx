import { CategoryCatalogService } from '@/features/category-catalog/category-catalog.service'
import { parseSearchParamsToDto } from '@/shared/lib/parseSearchParams'
import { CategoryPage } from '@/views/category'

interface CategoryRouteProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function CategoryRoute({ params, searchParams }: CategoryRouteProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const { dto, attributeFilters } = parseSearchParamsToDto(resolvedSearchParams)
  const { category, products } = await CategoryCatalogService.getCategoryData(slug, dto, attributeFilters)

  return <CategoryPage category={category} products={products} />
}
