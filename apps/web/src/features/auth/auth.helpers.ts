import Cookies from 'js-cookie'
import { IAuthResponse, ITokens } from '@/entities/user/types/user.interface'

export enum EnumTokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
  return accessToken || null
}

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user') || 'null')
}

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, data.accessToken)
  Cookies.set(EnumTokens.REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN)
  Cookies.remove(EnumTokens.REFRESH_TOKEN)
  localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}
