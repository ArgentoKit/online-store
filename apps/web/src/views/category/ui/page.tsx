import { ICategory } from '@/entities/category/types/category.interface'
import { IProduct } from '@/entities/product/types/product.interface'
import { ProductCard } from '@/entities/product/ui/product-card'
import { PUBLIC_URL } from '@/shared/config/url.config'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { BreadcrumbItemType } from '@/shared/ui/breadcrumbs/breadcrumbs'
import { Title } from '@/shared/ui/title'
import { Filters } from '@/widgets/filters'
import { Sidebar } from '@/widgets/sidebar'

interface CategoryProps {
  category: ICategory
  products: {
    items: IProduct[]
    meta: {
      page: number
      perPage: number
      totalPages: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: 'Главная страница', href: PUBLIC_URL.home() },
  { label: 'Категории', href: '' },
  { label: 'Телефоны и аксессуары ' },
]

export function CategoryPage({ category, products }: CategoryProps) {
  const productItems = products?.items
  const attributes = category.attributes

  return (
    <div className='container'>
      <Breadcrumbs items={breadcrumbItems} className='py-5' />
      <Title text={category.name} size='lg' className='mb-5' />
      <div className='flex gap-7.5'>
        <Sidebar>
          <Filters attributes={attributes} />
        </Sidebar>
        <div className='grid grid-cols-4 gap-x-4.5 gap-y-5 h-fit'>
          {productItems?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
