import { BottomFooter } from './components/bottom-footer'
import { TopFooter } from './components/top-footer'

export function Footer() {
  return (
    <footer className='fixed bottom-0 w-full bg-medium-grey-2'>
      <TopFooter />
      <BottomFooter />
    </footer>
  )
}
