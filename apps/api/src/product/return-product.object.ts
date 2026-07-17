import { returnCategoryObject } from '@/category/return-category.object'
import { returnReviewObject } from '@/review/return-review.object'
import { Prisma } from 'generated/prisma/client'

export const returnProductObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true
}

export const returnProductObjectFullest: Prisma.ProductSelect = {
  ...returnProductObject,
  reviews: {
    select: returnReviewObject,
  },
  categories: {
    select: {
      category: {
        select: returnCategoryObject,
      }
    },
  }
}