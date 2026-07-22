import { instance } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import { IReview } from '../types/review.interface'

type CreateReviewPayload = {
  text?: string
  rating?: number
}

export const ReviewService = {
  async getAllReviews(): Promise<IReview[]> {
    const { data } = await instance<IReview[]>({
      url: API_URL.review(),
      method: 'GET',
    })

    return data
  },

  async createReview(productId: string, payload: CreateReviewPayload): Promise<IReview> {
    const { data } = await instance<IReview>({
      url: API_URL.review(`/product/${productId}`),
      method: 'POST',
      data: payload,
    })

    return data
  },
}
