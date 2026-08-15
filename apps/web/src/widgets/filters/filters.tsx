import { ICategoryAttribute } from '@/entities/category/types/category.interface'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Button } from '@/shared/ui/button'
import { FilterCheckbox } from '@/shared/ui/filter-checkbox'
import { Input } from '@/shared/ui/input'
import { Slider } from '@/shared/ui/slider'
import { CheckboxFiltersGroup } from './filters-checkbox-group'

interface FiltersProps {
  attributes: ICategoryAttribute[]
}

export function Filters({ attributes }: FiltersProps) {
  return (
    <div className='flex flex-col gap-[30px] shadow p-[30px] pt-[25px]'>
      <div>
        <p className='text-t16 font-medium mb-[15px]'>Цена</p>
        <div className='flex gap-[30px] mb-3'>
          <Input type='number' placeholder='от' min={0} max={100000} className='input-size-sm' />
          <Input type='number' placeholder='до' min={1000} max={100000} className='input-size-sm' />
        </div>
        <Slider defaultValue={[10000, 50000]} max={100000} step={1000} className='w-[144px] mx-auto' />
      </div>

      <div>
        <Accordion type='multiple' defaultValue={['brand']} className='space-y-4'>
          {attributes.map((group) => {
            console.log(group)
            return (
              <CheckboxFiltersGroup
                key={group.attributeId}
                title={group.attribute.name}
                items={group.attribute.values}
                limit={6}
              />
            )
          })}
        </Accordion>
      </div>
      <div className='flex flex-col gap-5'>
        <Button variant='outline'>Применить</Button>
        <Button variant='outline'>Сбросить фильтры</Button>
      </div>
    </div>
  )
}
