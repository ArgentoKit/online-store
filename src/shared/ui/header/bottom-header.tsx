'use client'

import { useState } from 'react'
import Announcement from '@/shared/assets/icons/announcement.svg'
import AnnouncementHover from '@/shared/assets/icons/announcement-hover.svg'
import Charity from '@/shared/assets/icons/charity.svg'
import CharityHover from '@/shared/assets/icons/charity-hover.svg'
import Shop from '@/shared/assets/icons/shop.svg'
import ShopHover from '@/shared/assets/icons/shop-hover.svg'
import { InputSearch } from './search'

const bottomMenuLinks = {
  announcements: {
    title: 'Объявления',
    href: '/announcements',
    icon: <Announcement />,
    iconHover: <AnnouncementHover />,
  },
  shops: {
    title: 'Магазины',
    href: '/shops',
    icon: <Shop />,
    iconHover: <ShopHover />,
  },
  charity: {
    title: 'Благотворительность',
    href: '/charity',
    icon: <Charity />,
    iconHover: <CharityHover />,
  },
}

export function BottomHeader() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className='py-2.5 border-b-[1.5px] border-medium-grey bg-light-grey'>
      <div className='container flex items-center justify-between gap-10'>
        <ul className='flex items-center gap-10'>
          {Object.entries(bottomMenuLinks).map(([key, link]) => (
            <li
              key={key}
              onMouseEnter={() => setHoveredItem(key)}
              onMouseLeave={() => setHoveredItem(null)}
              className='group'
            >
              <a className='flex items-center gap-2.5' href={link.href}>
                {hoveredItem === key ? link.iconHover : link.icon}
                <span className='relative inline-block top-0.5 text-tb14 font-medium group-hover:text-bright-green'>
                  {link.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <InputSearch />
      </div>
    </div>
  )
}
