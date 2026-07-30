'use client'

import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import DialogIcon from '@/shared/assets/icons/dialog.svg'
import StarIcon from '@/shared/assets/icons/star.svg'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { ProductColors } from '@/shared/ui/product-colors'
import { Toggle } from '@/shared/ui/toggle'

export function ProductCard() {
  const [selectedColor, setSelectedColor] = useState(1)

  return (
    <Card className='relative max-w-[214px] pt-2.5'>
      <Toggle aria-label='Toggle-heart' className='absolute top-[15px] right-5'>
        <Heart className='text-bright-green group-data-[state=on]:fill-bright-green' />
      </Toggle>
      <div className='mx-auto'>
        <img src='/images/product.png' alt='Product name' />
      </div>
      <div className='flex flex-col gap-7.5 px-5 pb-7.5'>
        <div className='flex flex-col'>
          <a href='' className='w-fit text-t12 mb-2.5 text-medium-grey hover:text-dark-grey'>
            Смартфон
          </a>
          <a href='' className='text-t16 mb-[15px] hover:underline'>
            Xiaomi Redmi зеленый
          </a>
          <ProductColors selectedColor={selectedColor} onChange={setSelectedColor} />
        </div>
        <div>
          <div className='flex justify-between mb-[15px]'>
            <span className='text-t18 font-bold text-bright-green'>20 000$</span>
            <div className='flex gap-[15px]'>
              <a href='' className='flex items-center gap-[5px] group'>
                <span className='text-t12 group-hover:underline'>4</span>
                <StarIcon />
              </a>
              <a href='' className='flex items-center gap-[5px] group'>
                <DialogIcon />
                <span className='text-t12 group-hover:underline'>25</span>
              </a>
            </div>
          </div>
          <Button variant='ghost' icon='right' className='w-full shadow'>
            <span className='font-normal'>Купить</span>
            <ShoppingCart strokeWidth={1} />
          </Button>
        </div>
      </div>
    </Card>
  )
}
