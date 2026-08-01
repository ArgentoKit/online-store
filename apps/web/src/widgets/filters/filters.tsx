import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Button } from '@/shared/ui/button'
import { FilterCheckbox } from '@/shared/ui/filter-checkbox'
import { Input } from '@/shared/ui/input'
import { Slider } from '@/shared/ui/slider'
import { CheckboxFiltersGroup } from './filters-checkbox-group'

export const filters = [
  {
    id: 'brand',
    title: 'Бренд',
    options: [
      { text: 'Apple', value: 'apple' },
      { text: 'Samsung', value: 'samsung' },
      { text: 'Xiaomi', value: 'xiaomi' },
      { text: 'Honor', value: 'honor' },
      { text: 'Google', value: 'google' },
      { text: 'OnePlus', value: 'oneplus' },
      { text: 'Nothing', value: 'nothing' },
      { text: 'Motorola', value: 'motorola' },
    ],
  },
  {
    id: 'screen-size',
    title: 'Диагональ экрана',
    options: [
      { text: '5.8"', value: '5.8' },
      { text: '6.1"', value: '6.1' },
      { text: '6.3"', value: '6.3' },
      { text: '6.5"', value: '6.5' },
      { text: '6.7"', value: '6.7' },
      { text: '6.8"', value: '6.8' },
    ],
  },
  {
    id: 'storage',
    title: 'Объём памяти',
    options: [
      { text: '64 ГБ', value: '64' },
      { text: '128 ГБ', value: '128' },
      { text: '256 ГБ', value: '256' },
      { text: '512 ГБ', value: '512' },
      { text: '1 ТБ', value: '1024' },
    ],
  },
]

export function Filters() {
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
          {filters.map((group) => (
            <CheckboxFiltersGroup key={group.id} title={group.title} items={group.options} limit={6} />
          ))}
        </Accordion>
      </div>
      <div className='flex flex-col gap-5'>
        <Button variant='outline'>Применить</Button>
        <Button variant='outline'>Сбросить фильтры</Button>
      </div>
    </div>
  )
}
