import { CategoryList } from '@/entities/category/category-list'
import { Title } from '@/shared/ui/title'
import { Sidebar } from '@/widgets/sidebar'

export default async function Home() {
  return (
    <div className='container flex gap-7.5'>
      <Sidebar>
        <CategoryList />
      </Sidebar>

      <div className='pt-12.5'>
        <div>
          <Title text='Banner' size='lg' />
        </div>
        <div>
          <Title text='Recommended' size='lg' />
        </div>
        <div>
          <Title text='Popular' size='lg' />
        </div>
      </div>
    </div>
  )
}
