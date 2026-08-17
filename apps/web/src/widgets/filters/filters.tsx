'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { IAttribute } from '@/entities/category/types/category.interface'
import { Accordion } from '@/shared/ui/accordion'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Slider } from '@/shared/ui/slider'
import { CheckboxFiltersGroup } from './filters-checkbox-group'

interface FiltersProps {
  attributes: IAttribute[]
  priceRange: { min: number; max: number }
}

export function Filters({ attributes, priceRange }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selected, setSelected] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {}
    for (const attr of attributes) {
      const value = searchParams.get(attr.slug)
      if (value) initial[attr.slug] = value.split(',')
    }
    return initial
  })

  const [price, setPrice] = useState({
    min: searchParams.get('priceMin') ?? String(priceRange.min),
    max: searchParams.get('priceMax') ?? String(priceRange.max),
  })

  const toggleValue = (attributeSlug: string, valueId: string, multi: boolean) => {
    setSelected((prev) => {
      const current = prev[attributeSlug] ?? []
      if (multi) {
        const next = current.includes(valueId) ? current.filter((id) => id !== valueId) : [...current, valueId]
        return { ...prev, [attributeSlug]: next }
      }
      return { ...prev, [attributeSlug]: [valueId] }
    })
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1')

    for (const attr of attributes) {
      const values = selected[attr.slug]
      if (values?.length) params.set(attr.slug, values.join(','))
      else params.delete(attr.slug)
    }

    if (price.min) params.set('priceMin', price.min)
    else params.delete('priceMin')

    if (price.max) params.set('priceMax', price.max)
    else params.delete('priceMax')

    router.push(`?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelected({})
    setPrice({ min: String(priceRange.min), max: String(priceRange.max) })
    router.push('?page=1')
  }

  return (
    <div className='flex flex-col gap-[30px] shadow p-[30px] pt-[25px]'>
      <div>
        <p className='text-t16 font-medium mb-[15px]'>Цена</p>
        <div className='flex gap-[30px] mb-3'>
          <Input
            type='number'
            placeholder='от'
            min={priceRange.min}
            max={priceRange.max}
            value={price.min}
            onChange={(e) => setPrice((p) => ({ ...p, min: e.target.value }))}
            className='input-size-sm'
          />
          <Input
            type='number'
            placeholder='до'
            min={priceRange.min}
            max={priceRange.max}
            value={price.max}
            onChange={(e) => setPrice((p) => ({ ...p, max: e.target.value }))}
            className='input-size-sm'
          />
        </div>
        <Slider
          value={[Number(price.min), Number(price.max)]}
          min={priceRange.min}
          max={priceRange.max}
          step={1000}
          onValueChange={([min, max]) => setPrice({ min: String(min), max: String(max) })}
          className='w-[144px] mx-auto'
        />
      </div>

      <div>
        <Accordion type='multiple' defaultValue={attributes.map((a) => a.slug)} className='space-y-4'>
          {attributes.map((attribute) => (
            <CheckboxFiltersGroup
              key={attribute.slug}
              attributeSlug={attribute.slug}
              title={attribute.name}
              items={attribute.values}
              selectedIds={selected[attribute.slug] ?? []}
              multi={attribute.type === 'MULTISELECT'}
              onToggle={toggleValue}
              limit={6}
            />
          ))}
        </Accordion>
      </div>

      <div className='flex flex-col gap-5'>
        <Button variant='outline' onClick={applyFilters}>
          Применить
        </Button>
        <Button variant='outline' onClick={resetFilters}>
          Сбросить фильтры
        </Button>
      </div>
    </div>
  )
}
