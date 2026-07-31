import { FilterCheckbox } from '@/shared/ui/filter-checkbox'

export function Filters() {
  return (
    <div className='flex flex-col gap-[30px] shadow p-[30px] pt-[25px]'>
      <span className='text-t16 mb-[15px]'>Цена</span>

      <div>
        <span>Бренд</span>
        <FilterCheckbox text='Apple' value='1' />
        <FilterCheckbox text='Xiaomi' value='2' />
        <FilterCheckbox text='Samsung' value='3' />
      </div>
    </div>
  )
}
