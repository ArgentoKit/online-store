import { IProduct } from '@/entities/product/types/product.interface'

const enum UnitEnum {
  GB,
  TB,
  MB,

  INCH,

  KG,
  G,

  HZ,
  MHZ,
  GHZ,

  MAH,

  USD,
  EUR,
  UAH,

  PERCENT,
}

const enum AttributeTypeEnum {
  SELECT,
  MULTISELECT,
  RANGE,
}

export interface IAttributeValue {
  attributeId: string
  id: string
  value: string
}
export interface IAttribute {
  id: string
  name: string
  slug: string
  step: number | null
  type: AttributeTypeEnum
  unit: UnitEnum
  values: IAttributeValue[]
}
export interface ICategoryAttribute {
  categoryId: string
  attributeId: string
  isFilter: boolean
  sortOrder: number
  attribute: IAttribute
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
  attributes: ICategoryAttribute[]
  products: IProductCategory[]
}
