import { Prisma } from 'generated/prisma/client'

export const returnCategoryObject: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true,
  parentId: true,
}

export const returnCategoryObjectFullest = {
  ...returnCategoryObject,
  attributes: {
    where: { isFilter: true },
    orderBy: { sortOrder: 'asc' },
    select: {
      attribute: {
        select: {
          name: true,
          slug: true,
          type: true,
          unit: true,
          step: true,
          values: {
            select: {
              id: true,
              value: true,
            },
          },
        },
      },
    },
  },
} as const
