import Link from 'next/link'
import { HeaderNavLink, HeaderNavProps } from '../model/header-nav.interface'

const itemClassName = 'flex items-center gap-2.5 text-tb14 font-medium group-hover:text-bright-green'

function NavItem({ link }: { link: HeaderNavLink }) {
  const content = (
    <>
      <link.icon size={17} strokeWidth={1} className='group-hover:text-bright-green' />
      <span className='relative inline-block top-0.5'>{link.title}</span>
    </>
  )

  if (link.type === 'link') {
    return (
      <Link href={link.href} className={itemClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button type='button' onClick={link.onClick} className={itemClassName}>
      {content}
    </button>
  )
}

export function HeaderNav({ links }: HeaderNavProps) {
  return (
    <ul className='flex items-center gap-10'>
      {links.map((link) => (
        <li key={link.title} className='group'>
          <NavItem link={link} />
        </li>
      ))}
    </ul>
  )
}
