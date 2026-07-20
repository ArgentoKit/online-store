export interface IUser {
  id: string
  email: string
  password: string
  name: string
  avatarPath: string | null
  phone: string | null
}

export interface IUserState {
  email: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IInitialState {
  User: IUserState | null
  isLoading: boolean
}

export interface IEmailPassword {
  email: string
  password: string
}

export interface IAuthResponse extends ITokens {
  user: IUser
}
