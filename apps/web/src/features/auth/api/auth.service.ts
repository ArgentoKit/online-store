import axios from 'axios'
import Cookies from 'js-cookie'

import { IAuthResponse, IEmailPassword } from '@/entities/user/types/user.interface'
import { removeFromStorage, saveToStorage } from '@/features/auth/auth.helpers'
import { getContentType } from '@/shared/api/api.helpers'
import { API_URL } from '@/shared/config/api.config'

export const AuthService = {
  async main(type: 'login' | 'register', data: IEmailPassword) {
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
