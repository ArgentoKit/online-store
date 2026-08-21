export const enum UnitEnum {
  GB = 'GB',
  TB = 'TB',
  MB = 'MB',
  INCH = 'INCH',
  KG = 'KG',
  G = 'G',
  HZ = 'HZ',
  MHZ = 'MHZ',
  GHZ = 'GHZ',
  MAH = 'MAH',
  USD = 'USD',
  EUR = 'EUR',
  UAH = 'UAH',
  PERCENT = 'PERCENT',
}

export const enum AttributeTypeEnum {
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  RANGE = 'RANGE',
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

export interface ICategory {
  id: string
  name: string
  slug: string
  parentId?: string | null
  attributes: ICategoryAttribute[]
}

export interface ICategoryBase {
  id: string
  name: string
  slug: string
  parentId: string | null
}

export interface ICategoryWithFilters {
  id: string
  name: string
  slug: string
  filters: {
    attributes: IAttribute[]
    price: { min: number; max: number }
  }
}

export interface ICategoryTreeNode extends ICategoryBase {
  children: ICategoryTreeNode[]
}
