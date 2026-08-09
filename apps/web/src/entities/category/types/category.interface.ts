import { IProduct } from '@/entities/product/types/product.interface'

export interface ICategoryAttribute {
  categoryId: string
  attributeId: string
  isFilter: boolean
  sortOrder: number
}

export interface IProductCategory {
  productId: string
  categoryId: string
  product: IProduct
}

export interface ICategory {
  id: string
  name: string
  slug: string
  parentId?: string | null
  attributes?: ICategoryAttribute[]
  products?: IProductCategory[]
}
