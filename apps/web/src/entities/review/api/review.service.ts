import { instance } from '@/shared/api/api.interceptor'
import { IReview } from '../types/review.interface'

type CreateReviewPayload = {
  text?: string
  rating?: number
}

export const ReviewService = {
  async getAllReviews(): Promise<IReview[]> {
    const { data } = await instance<IReview[]>({
      url: `/reviews`,
      method: 'GET',
    })

    return data
  },

  async createReview(productId: string, payload: CreateReviewPayload): Promise<IReview> {
    const { data } = await instance<IReview>({
      url: `/reviews/product/${productId}`,
      method: 'POST',
      data: payload,
    })

    return data
  },
}
