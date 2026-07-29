import { Heart, LucideIcon, Scale, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

// interface DefaultAction {
//   title: string
//   icon: LucideIcon | null
// }

// const actions: DefaultAction[] = [
//   {
//     title: 'Поддержка',
//     icon: null,
//   },
//   {
//     title: '',
//     icon: Scale,
//   },
//   {
//     title: '',
//     icon: Heart,
//   },
//   {
//     title: '',
//     icon: ShoppingCart,
//   },
// ]

export function DefaultBottomAction() {
  return (
    <div className='flex items-center justify-end gap-7.5'>
      <Link href='/support'>
        <span className='hover:text-bright-green'>Поддержка</span>
      </Link>
      <ul className='flex gap-5'>
        <li>
          <Link href='/comparison' className='hover:text-bright-green'>
            <Scale strokeWidth={1} />
          </Link>
        </li>
        <li>
          <Link href='/favorites' className='hover:text-bright-green'>
            <Heart strokeWidth={1} />
          </Link>
        </li>
        <li>
          <Link href='/cart' className='hover:text-bright-green'>
            <ShoppingCart strokeWidth={1} />
          </Link>
        </li>
      </ul>
    </div>
  )
}
