import { CategoryService } from '@/entities/category/api/category.service'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { DefaultBottom } from '@/widgets/header/ui/default-bottom'

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const categoryTree = await CategoryService.getTree()

  return (
    <>
      <Header bottom={<DefaultBottom categories={categoryTree} />} />
      <main className='w-full mx-auto overflow-x-clip overflow-y-visible'>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  )
}
