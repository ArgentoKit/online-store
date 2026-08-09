import { Prisma } from 'generated/prisma/client'
import { returnProductObject } from '@/product/return-product.object'

export const returnCategoryObject: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true,
  parentId: true,
}

export const returnCategoryObjectFullest: Prisma.CategorySelect = {
  ...returnCategoryObject,
  products: {
    select: {
      product: {
        select: returnProductObject,
      },
    },
  },
  attributes: {
    select: {
      categoryId: true,
      attributeId: true,
      isFilter: true,
      sortOrder: true,
      attribute: {
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          unit: true,
          step: true,
          values: {
            select: {
              id: true,
              attributeId: true,
              value: true,
            },
          },
        },
      },
    },
  },
}
