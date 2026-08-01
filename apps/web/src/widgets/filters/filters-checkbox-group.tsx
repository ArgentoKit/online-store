'use client'

import { useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Button } from '@/shared/ui/button'
import { FilterCheckbox, FilterCheckboxProps } from '@/shared/ui/filter-checkbox'

interface Props {
  title: string
  items: FilterCheckboxProps[]
  defaultItems?: FilterCheckboxProps[]
  limit?: number
  onChange?: (values: string[]) => void
  defaultValue?: string[]
  className?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 6,
  className,
  onChange,
  defaultValue,
}) => {
  const [showAll, setShowAll] = useState(false)
  const shownItems = showAll ? items : items.slice(0, limit)

  return (
    <>
      <AccordionItem value={String(title).toLowerCase()}>
        <AccordionTrigger className='text-t16 pt-0'>{title}</AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col gap-2.5 max-h-96 pr-2 pb-2.5 overflow-auto scrollbar'>
            {shownItems.map((filter) => (
              <FilterCheckbox
                key={String(filter.text)}
                onCheckedChange={(ids) => console.log(ids)}
                checked={false}
                value={filter.value}
                text={filter.text}
                endAdornment={filter.endAdornment}
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
    </>
  )
}
