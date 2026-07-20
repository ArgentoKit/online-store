import { IUser } from '@/entities/user/types/user.interface'

export interface IReview {
  id: string
  text: string
  rating: number
  createdAt: string
  user: IUser
}
