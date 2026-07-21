import { instance } from '@/shared/api/api.interceptor'
import { IUser } from '../types/user.interface'

type updateProfilePayload = {
  password?: string
  name?: string
  avatarPath?: string | null
  phone?: string | null
}

export const UserService = {
  async getUserProfile(): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: '/user/profile',
      method: 'GET',
    })

    return data
  },

  async updateUserProfile(payload: updateProfilePayload): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: '/user/profile',
      method: 'PUT',
      data: payload,
    })

    return data
  },

  async deleteUserProfile(): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: '/user/profile',
      method: 'DELETE',
    })

    return data
  },

  async toggleFavorite(productId: string): Promise<IUser> {
    const { data } = await instance<IUser>({
      url: `user/profile/favorites/${productId}`,
      method: 'PATCH',
    })

    return data
  },
}
