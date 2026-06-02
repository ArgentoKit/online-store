import { returnUserObject } from '@/user/return-user.object'
import { Prisma } from 'generated/prisma/client'

export const returnReviewObject: Prisma.ReviewSelect = {
  id: true,
  createdAt: true,
  rating: true,
  text: true,
  user: {
    select: returnUserObject,
  },
}
