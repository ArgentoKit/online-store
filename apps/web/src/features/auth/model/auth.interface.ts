import { IUser } from '@/entities/user/types/user.interface'
import { LoginSchemaType } from './login.schema'
import { RegisterSchemaType } from './register.schema'

export type IAuthForm = LoginSchemaType | RegisterSchemaType

export interface IAuthResponse {
  user: IUser
  accessToken: string
}
