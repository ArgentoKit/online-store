import { ProductCard } from '@/entities/product/ui/product-card'
import { SectionHeader } from '@/shared/ui/section-header'

export default function Home() {
  return (
    <div className='container'>
      <div className='w-full flex flex-col gap-20 pt-12.5'>
        <div>
          <SectionHeader title='Хиты продаж' href='/popular' className='mb-7.5' />
          <section className='flex justify-between'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </section>
        </div>
        <section>
          <SectionHeader title='Новинки' href='/new' />
        </section>

        <section>
          <SectionHeader title='Скидки' href='/discount' />
        </section>
      </div>
    </div>
  )
}
