import PlusIcon from '@/shared/assets/icons/plus.svg'
import { Button } from '@/shared/ui/button'

export function PostAdButton() {
  return (
    <Button variant='green' size='b30' icon='right'>
      Подать объявление
      <div className='size-[18px] bg-white rounded-full flex items-center justify-center'>
        <PlusIcon className='size-auto text-bright-green' />
      </div>
    </Button>
  )
}
