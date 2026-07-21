import { instance } from '@/shared/api/api.interceptor'
import { IOrder } from '../types/order.interface'

export const OrderService = {
  async getAll(): Promise<IOrder[]> {
    const { data } = await instance<IOrder[]>({
      url: '/orders',
      method: 'GET',
    })

    return data
  },
}
