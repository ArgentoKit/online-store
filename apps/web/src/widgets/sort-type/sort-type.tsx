'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ProductSortByEnum } from '@/entities/product/types/product.interface'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

const SORT_OPTIONS: { value: ProductSortByEnum; label: string }[] = [
  { value: ProductSortByEnum.NEWEST, label: 'Сначала новые' },
  { value: ProductSortByEnum.OLDEST, label: 'Сначала старые' },
  { value: ProductSortByEnum.LOW_PRICE, label: 'Сначала дешевле' },
  { value: ProductSortByEnum.HIGH_PRICE, label: 'Сначала дороже' },
]

export function SortType() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSort = (searchParams.get('sort') as ProductSortByEnum) ?? ProductSortByEnum.NEWEST

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    params.set('page', '1')

    router.push(`?${params.toString()}`)
  }

  return (
    <div className='flex items-center'>
      <span className='text-t12 text-medium-grey'>Сортировка: </span>
      <Select value={currentSort} onValueChange={handleChange}>
        <SelectTrigger className='font-medium text-t12 p-0 pl-1.5'>
          <SelectValue placeholder='Сортировка' />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value} className='text-t12'>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
