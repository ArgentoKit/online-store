import { ICategoryBase, UnitEnum } from '@/entities/category/types/category.interface'
import { IReview } from '@/entities/review/types/review.interface'

export enum ProductSortByEnum {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export interface IProduct {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  createdAt: string
  categories: { category: ICategoryBase }[]
}

export interface IProductAttributeValue {
  attribute: { name: string; slug: string; unit: UnitEnum | null }
  value: { value: string } | null
}

export interface IProductFullest extends IProduct {
  reviews: IReview[]
  categories: { category: ICategoryBase }[]
  attributes: IProductAttributeValue[]
}

export interface IPaginationMeta {
  total: number
  page: number
  perPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface productPayload {
  name?: string
  price?: number
  description?: string
  images?: string[]
  categoryIds?: string[]
}

export interface ProductFilterDto {
  page?: string
  perPage?: string
  sort?: ProductSortByEnum
  priceMin?: string
  priceMax?: string
}
