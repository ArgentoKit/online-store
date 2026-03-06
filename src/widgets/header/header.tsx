import { BottomHeader } from './components/bottom-header'
import { TopHeader } from './components/top-header'

export function Header() {
  return (
    <header className=''>
      <div className='w-full h-1.5 bg-linear-to-r from-bright-green to-white'></div>
      <TopHeader />
      <BottomHeader />
    </header>
  )
}
