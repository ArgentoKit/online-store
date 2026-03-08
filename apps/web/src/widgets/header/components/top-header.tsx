import Person from '@/shared/assets/icons/person.svg'
import { Location } from '@/shared/ui/location'
import { Logo } from '@/shared/ui/logo'

const topMenuLinks = {
  'bulletin-board': {
    title: 'Доска объявлений',
    href: '/bulletin-board',
  },
  'service-center': {
    title: 'Сервисный центр',
    href: '/service-center',
  },
  'dilly-shop': {
    title: 'Интернет-магазин Dily.com',
    href: '/',
  },
  purchase: {
    title: 'Скупка',
    href: '/purchase',
  },
}

export function TopHeader() {
  return (
    <div className='border-b-[1.5px] border-medium-grey'>
      <div className='container flex items-center'>
        <Logo className='pr-5' />
        <nav className='flex grow'>
          <ul className='flex items-center'>
            {Object.entries(topMenuLinks).map(([key, link]) => (
              <li
                key={key}
                className='relative p-5 cursor-pointer hover:bg-light-green transition-colors duration-150 menu-hover'
              >
                <a className='text-t14 font-medium' href={link.href}>
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className='flex gap-7.5'>
          <Location />
          <a href='' className='flex items-center gap-2.5'>
            <Person />
            <span className='text-t14 font-medium text-dark-grey'>Вход/ регистрация</span>
          </a>
        </div>
      </div>
    </div>
  )
}
