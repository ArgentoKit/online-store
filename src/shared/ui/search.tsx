import { useState } from 'react'
import Search from '@/shared/assets/icons/search.svg'
import { cn } from '@/shared/utils/utils'

export function InputSearch() {
  const [inputValue, setInputValue] = useState('')

  return (
    <form method='post' onSubmit={() => {}} className='flex items-center h-7 group'>
      <div className='relative'>
        {!inputValue && <Search className='absolute left-3.75 top-1/2 -translate-y-1/2' />}
        <input
          id='menu-search'
          type='text'
          placeholder='Я хочу купить'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={cn(
            'h-7 text-t12 pl-10 pr-2.5 rounded-l-[18px] border border-transparent focus:border-dark-grey outline-none transition-colors duration-150',
            inputValue && 'pl-3.75 pr-8.75'
          )}
        />
      </div>
      <button className='h-full px-6 rounded-r-[18px] bg-medium-grey group-focus-within:bg-dark-grey group-focus-within:text-white text-t14 font-medium transition-colors duration-150'>
        Найти
      </button>
    </form>
  )
}
