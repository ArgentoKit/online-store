'use client'

import { useState } from 'react'
import { IAttributeValue } from '@/entities/category/types/category.interface'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Button } from '@/shared/ui/button'
import { FilterCheckbox } from '@/shared/ui/filter-checkbox'

interface Props {
  attributeSlug: string
  title: string
  items: IAttributeValue[]
  selectedIds: string[]
  multi: boolean
  onToggle: (attributeSlug: string, valueId: string, multi: boolean) => void
  limit?: number
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  attributeSlug,
  title,
  items,
  selectedIds,
  multi,
  onToggle,
  limit = 6,
}) => {
  const [showAll, setShowAll] = useState(false)
  const shownItems = showAll ? items : items.slice(0, limit)

  return (
    <AccordionItem value={attributeSlug}>
      <AccordionTrigger className='text-t16 pt-0'>{title}</AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col gap-2.5 max-h-96 pr-2 pb-2.5 overflow-auto scrollbar'>
          {shownItems.map((filter) => (
            <FilterCheckbox
              key={filter.id}
              checked={selectedIds.includes(filter.id)}
              onCheckedChange={() => onToggle(attributeSlug, filter.id, multi)}
              value={filter.value}
              text={filter.value}
            />
          ))}
        </div>
        {items.length > limit && (
          <Button variant='link' size='link' className='font-medium' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Скрыть' : 'Показать еще'}
          </Button>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
