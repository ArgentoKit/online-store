'use client'

import { HeaderNav } from '@/features/header-nav'
import { rootNavLinks } from '@/features/header-nav/config/root-nav-links'
import { ProductSearch } from '@/features/product-search/ui/search'
import { DefaultBottomAction } from './default-bottom-action'

export function DefaultBottom() {
  return (
    <>
      <HeaderNav links={rootNavLinks} />
      <ProductSearch />
      <DefaultBottomAction />
    </>
  )
}
