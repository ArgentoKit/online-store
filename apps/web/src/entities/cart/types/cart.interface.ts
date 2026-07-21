import { IProduct } from '@/entities/product/types/product.interface'

export interface ICartItem {
  id: string
  product: IProduct
  quantity: number
  price: number
}
