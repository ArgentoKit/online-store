import { ProductSortByEnum } from '@/entities/product/types/product.interface'

type SearchParams = Record<string, string | string[] | undefined>

const KNOWN_KEYS = ['page', 'perPage', 'sort', 'priceMin', 'priceMax']

const SORT_VALUES = Object.values(ProductSortByEnum) as string[]

export function parseSearchParamsToDto(searchParams: SearchParams) {
  const dto = {
    page: getString(searchParams.page) ?? '1',
    perPage: getString(searchParams.perPage) ?? '20',
    sort: getSortValue(searchParams.sort),
    priceMin: getString(searchParams.priceMin),
    priceMax: getString(searchParams.priceMax),
  }

  const attributeFilters: Record<string, string[]> = {}
  for (const [key, value] of Object.entries(searchParams)) {
    if (KNOWN_KEYS.includes(key) || value === undefined) continue
    const raw = Array.isArray(value) ? value[0] : value
    attributeFilters[key] = raw.split(',')
  }

  return { dto, attributeFilters }
}

function getString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function getSortValue(value: string | string[] | undefined): ProductSortByEnum | undefined {
  const raw = getString(value)
  if (raw && SORT_VALUES.includes(raw)) {
    return raw as ProductSortByEnum
  }
  return undefined
}
