import { ICartItem } from '@/entities/cart/types/cart.interface'
import { IUser } from '@/entities/user/types/user.interface'

export enum OrderStatusEnum {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export interface IOrder {
  id: string
  status: OrderStatusEnum
  items: ICartItem[]
  user: IUser
  createdAt: string
}
