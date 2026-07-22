import { instance } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import { IUser, updateProfilePayload } from '../types/user.interface'

export const UserService = {
  async getUserProfile(): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: API_URL.user('/profile'),
      method: 'GET',
    })

    return data
  },

  async updateUserProfile(payload: updateProfilePayload): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: API_URL.user('/profile'),
      method: 'PUT',
      data: payload,
    })

    return data
  },

  async deleteUserProfile(): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: API_URL.user('/profile'),
      method: 'DELETE',
    })

    return data
  },

  async toggleFavorite(productId: string): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: API_URL.user(`/profile/favorites/${productId}`),
      method: 'PATCH',
    })

    return data
  },
}
