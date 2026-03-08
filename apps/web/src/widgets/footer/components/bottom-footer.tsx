interface NavLink {
  name: string
  href: string
}

interface FooterNavLinks {
  name: string
  links: NavLink[]
}

const footerNavLinks: FooterNavLinks[] = [
  {
    name: 'Доска объявлений',
    links: [
      {
        name: 'Объявления',
        href: '#test',
      },
      {
        name: 'Магазины',
        href: '#test',
      },
      {
        name: 'Благотворительность',
        href: '#test',
      },
      {
        name: 'Личный кабинет',
        href: '#test',
      },
    ],
  },
  {
    name: 'Сервисный центр',
    links: [
      {
        name: 'Что мы чиним',
        href: '#test',
      },
      {
        name: 'Адреса сервисных центров',
        href: '#test',
      },
    ],
  },
  {
    name: 'Интернет-магазин',
    links: [
      {
        name: 'Каталог товаров',
        href: '#test',
      },
      {
        name: 'Доставка и оплата',
        href: '#test',
      },
      {
        name: 'Корзина',
        href: '#test',
      },
      {
        name: 'Личный кабинет',
        href: '#test',
      },
      {
        name: 'Контакты',
        href: '#test',
      },
      {
        name: 'Вакансии',
        href: '#test',
      },
    ],
  },
  {
    name: 'Пользователям',
    links: [
      {
        name: 'Гарантии',
        href: '#test',
      },
      {
        name: 'Доставка и оплата',
        href: '#test',
      },
      {
        name: 'Служба поддержки',
        href: '#test',
      },
      {
        name: 'Вопрос-ответ',
        href: '#test',
      },
    ],
  },
]

const footerPrivacyLinks: NavLink[] = [
  {
    name: 'Политика конфиденциальности',
    href: '#test',
  },
  {
    name: 'Пользовательское соглашение',
    href: '#test',
  },
  {
    name: 'Использование cookies',
    href: '#test',
  },
  {
    name: 'Карта сайта',
    href: '#test',
  },
]

export function BottomFooter() {
  return (
    <div>
      <div className='pt-[30px] pb-[110px]'>
        <nav className='container flex gap-[85px]'>
          {footerNavLinks.map(({ name, links }) => (
            <div key={name}>
              <h3 className='font-bold mb-2'>{name}</h3>
              <ul>
                {links.map((link, index) => (
                  <li key={index} className='mb-2'>
                    <a href={link.href} className='font-medium hover:font-bold' data-title={link.name}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className='bg-white py-3'>
        <div className='container flex justify-between'>
          <div className='flex gap-12'>
            {footerPrivacyLinks.map((link) => (
              <a key={link.name} href={link.href} className='hover:font-bold' data-title={link.name}>
                {link.name}
              </a>
            ))}
          </div>
          <div>
            <span className='inline-block mr-3'>Dily.com</span>
            <span>2021©</span>
          </div>
        </div>
      </div>
    </div>
  )
}
