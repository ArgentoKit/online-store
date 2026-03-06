import FacebookIcon from '@/shared/assets/icons/facebook.svg'
import InstagramIcon from '@/shared/assets/icons/instagram.svg'
import { Location } from '@/shared/ui/location'
import { Logo } from '@/shared/ui/logo'

const socialMediaLinks = {
  facebook: {
    url: 'https://www.facebook.com/',
    icon: <FacebookIcon className='text-bright-green' />,
  },
  instagram: {
    url: 'https://www.instagram.com/',
    icon: <InstagramIcon className='text-bright-green' />,
  },
}

export function TopFooter() {
  return (
    <div className='border-b-[1.5px] border-medium-grey'>
      <div className='container flex py-[14px]'>
        <div className='flex grow gap-15'>
          <Logo />
          <Location className='font-medium text-bright-green' />
        </div>
        <div className='flex items-center gap-5'>
          <span className='inline-block font-medium'>Присоединяйтесь к нам </span>
          <div className='flex items-center gap-[10px]'>
            {Object.entries(socialMediaLinks).map(([key, { url, icon }]) => (
              <a
                key={key}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-white rounded-full w-[33px] h-[33px] flex items-center justify-center'
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
