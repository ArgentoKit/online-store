import { PUBLIC_URL } from '@/shared/config/url.config'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { BreadcrumbItemType } from '@/shared/ui/breadcrumbs/breadcrumbs'
import { Title } from '@/shared/ui/title'
import { Filters } from '@/widgets/filters'
import { Sidebar } from '@/widgets/sidebar'

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: 'Главная страница', href: PUBLIC_URL.home() },
  { label: 'Категории', href: '' },
  { label: 'Телефоны и аксессуары ' },
]

export function CategoryPage() {
  return (
    <div className='container'>
      <Breadcrumbs items={breadcrumbItems} className='py-5' />
      <Title text='Смартфоны' size='lg' className='mb-5' />
      <div className='flex gap-7.5'>
        <Sidebar>
          <Filters />
        </Sidebar>
      </div>
    </div>
  )
}
