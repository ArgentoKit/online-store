import { Prisma } from 'generated/prisma/client'
import { returnCategoryObject } from '@/category/return-category.object'
import { returnReviewObject } from '@/review/return-review.object'

export const returnProductObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
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
      },
    },
  },
}
