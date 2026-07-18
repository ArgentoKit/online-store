'use client'

import { useState } from 'react'
import { categoryIcons } from './category-icons'

const TemplateData: Category[] = [
    {
        "id": "cmrp01zrp000168oaf9ktv5cq",
        "name": "Одежда и обувь",
        "slug": "clothing-and-footwear",
        "parentId": null
    },
    {
        "id": "cmrp01zrx000468oa110j2mvt",
        "name": "Телефоны и аксессуары",
        "slug": "phones-and-accessories",
        "parentId": null
    },
    {
        "id": "cmrp01zs0000768oaqqmdwr49",
        "name": "Электроника",
        "slug": "electronics",
        "parentId": null
    },
    {
        "id": "cmrp01zs6000a68oawvf026cw",
        "name": "Бытовая техника",
        "slug": "home-appliances",
        "parentId": null
    },
    {
        "id": "cmrp01zse000f68oal63lon5l",
        "name": "Дом и сад",
        "slug": "home-and-garden",
        "parentId": null
    },
    {
        "id": "cmrp01zsi000i68oa74wc9zdu",
        "name": "Товары для детей",
        "slug": "kids-products",
        "parentId": null
    },
    {
        "id": "cmrp01zsl000l68oaj8gerzhp",
        "name": "Животные",
        "slug": "animals",
        "parentId": null
    },
    {
        "id": "cmrp01zsp000o68oah49g4otl",
        "name": "Хобби и отдых",
        "slug": "hobbies-and-leisure",
        "parentId": null
    },
    {
        "id": "cmrp01zsv000r68oawvyvjb6i",
        "name": "Транспорт",
        "slug": "transport",
        "parentId": null
    },
    {
        "id": "cmrp3eymr0001ycoaegtzi6px",
        "name": "Автотовары",
        "slug": "auto-products",
        "parentId": null
    },
    {
        "id": "cmrp3fzab0002ycoa4qr2pp4s",
        "name": "Недвижимость",
        "slug": "real-estate",
        "parentId": null
    },
    {
        "id": "cmrp3fzab0002ycoa4qr2pp4q",
        "name": "Работа",
        "slug": "jobs",
        "parentId": null
    },
    {
        "id": "cmrp3fzab0002ycoa4qr2pp6n",
        "name": "Услуги",
        "slug": "services",
        "parentId": null
    },
    {
        "id": "cmrp3fzab0002ycoa4qr2pp9o",
        "name": "Для бизнеса",
        "slug": "for-business",
        "parentId": null
    },
    {
        "id": "cmrp3fzab0002ycoa4qr2pp2b",
        "name": "Отдам даром",
        "slug": "free",
        "parentId": null
    }
]

type CategorySlug = Exclude<keyof typeof categoryIcons, `${string}-hover`>
type Category = {
  id: string
  name: string
  slug: CategorySlug
  parentId: string | null
}

export function CategoryList({ children }: Readonly<{
  children?: React.ReactNode
}>) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <ul className='flex flex-col gap-2.5'>
      {
        TemplateData.map(category => {
          const iconKey = hoveredItem === category.id ? `${category.slug}-hover` : category.slug
          const Icon = categoryIcons[iconKey as CategorySlug]

          return (
            <li key={category.id}>
              <a 
                className='flex items-center gap-2.5 text-t16 font-medium hover:text-bright-green' 
                href={`/${category.slug}`}
                onMouseEnter={() => setHoveredItem(category.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {Icon ? <Icon width={25} height={25} /> : null}
                <span>{category.name}</span>
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}