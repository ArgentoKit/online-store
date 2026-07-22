import { instance } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import { IOrder } from '../types/order.interface'

export const OrderService = {
  async getAll(): Promise<IOrder[]> {
    const { data } = await instance<IOrder[]>({
      url: API_URL.order(),
      method: 'GET',
    })

    return data
  },
}
