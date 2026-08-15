'use client'

import { ProductCard } from '@/entities/product/ui/product-card'
import { useProducts } from '@/shared/hooks/useProducts'
import { SectionHeader } from '@/shared/ui/section-header'

export default function Home() {
  const { data } = useProducts('')
  const products = data?.products

  return (
    <div className='container'>
      <div className='w-full flex flex-col gap-20 pt-12.5'>
        <div>
          <SectionHeader title='Хиты продаж' href='/popular' className='mb-7.5' />
          <section className='grid grid-cols-5 gap-y-5'>
            {products?.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
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
