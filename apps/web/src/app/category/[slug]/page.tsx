import { CategoryService } from '@/entities/category/api/category.service'
import { CategoryPage } from '@/views/category'

interface CategoryRouteProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { slug } = await params
  const data = await CategoryService.getBySlug(slug)

  return <CategoryPage category={data} />
}
