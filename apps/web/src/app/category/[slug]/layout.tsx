import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { DefaultBottom } from '@/widgets/header/ui/default-bottom'

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header bottom={<DefaultBottom />} />
      <main className='w-full mx-auto overflow-x-clip'>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  )
}
