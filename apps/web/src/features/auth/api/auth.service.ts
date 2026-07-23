import axios from 'axios'
import Cookies from 'js-cookie'

import { IAuthResponse } from '@/entities/user/types/user.interface'
import { removeFromStorage, saveToStorage } from '@/features/auth/lib/auth.helpers'
import { getContentType } from '@/shared/api/api.helpers'
import { API_URL } from '@/shared/config/api.config'
import { IAuthForm } from '../model/auth.interface'

export const AuthService = {
  async main(type: 'login' | 'register', data: IAuthForm) {
    const response = await axios<IAuthResponse>({
      url: API_URL.auth(`/${type}`),
      method: 'POST',
      data,
    })

    if (response.data.accessToken) saveToStorage(response.data)

    return response.data
  },

  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')

    const response = await axios.post<string, { data: IAuthResponse }>(
      process.env.NEXT_PUBLIC_API_URL + `${API_URL.auth('/login/access-token')}`,
      { refreshToken },
      { headers: getContentType() }
    )

    if (response.data.accessToken) saveToStorage(response.data)

    return response
  },

  async logout() {
    const response = await axios<boolean>({
      url: API_URL.auth('/logout'),
      method: 'POST',
    })

    if (response.data) removeFromStorage()

    return response
  },
}
