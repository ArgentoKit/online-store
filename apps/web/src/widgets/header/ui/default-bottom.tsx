'use client'

import { ICategoryTreeNode } from '@/entities/category/types/category.interface'
import { HeaderNav } from '@/features/header-nav'
import { rootNavLinks } from '@/features/header-nav/config/root-nav-links'
import { HeaderNavLink } from '@/features/header-nav/model/header-nav.interface'
import { ProductSearch } from '@/features/product-search/ui/search'
import { CatalogMenu } from '@/widgets/catalog-menu'
import { DefaultBottomAction } from './default-bottom-action'

interface DefaultBottomProps {
  categories: ICategoryTreeNode[]
}

export function DefaultBottom({ categories }: DefaultBottomProps) {
  const links: HeaderNavLink[] = [
    { type: 'node', key: 'catalog', node: <CatalogMenu categories={categories} /> },
    ...rootNavLinks,
  ]

  return (
    <>
      <HeaderNav links={links} />
      <ProductSearch />
      <DefaultBottomAction />
    </>
  )
}
