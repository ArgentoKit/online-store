import { ICategory } from '@/entities/category/types/category.interface'
import { IReview } from '@/entities/review/types/review.interface'

export interface IProduct {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  createdAt: string
}

export interface IProductFullest extends IProduct {
  reviews: IReview[]
  categories: ICategory[]
}

export interface productPayload {
  name?: string
  price?: number
  description?: string
  images?: string[]
  categoryId?: string
}
