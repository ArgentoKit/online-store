import { instance } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import { IProduct, ProductFilterDto, productPayload } from '../types/product.interface'

interface GetProductsResponse {
  products: IProduct[]
  length: number
}

export const ProductService = {
  async getAllProducts(searchTerm?: string | null): Promise<GetProductsResponse> {
    const { data } = await instance<GetProductsResponse>({
      url: API_URL.product(),
      method: 'GET',
      params: searchTerm ? { searchTerm } : {},
    })

    return data
  },

  async getProductById(productId: string): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: API_URL.product(`/${productId}`),
      method: 'GET',
    })

    return data
  },

  async getSimilarProduct(productId: string): Promise<IProduct[]> {
    const { data } = await instance<IProduct[]>({
      url: API_URL.product(`/similar/${productId}`),
      method: 'GET',
    })

    return data
  },

  async getProductBySlug(slug: string) {
    const { data } = await instance<IProduct>({
      url: API_URL.product(`/by-slug/${slug}`),
      method: 'GET',
    })

    return data
  },

  async getProductByCategory(
    categorySlug: string,
    pagination?: ProductFilterDto,
    attributeFilters: Record<string, string[]> = {}
  ): Promise<{
    items: IProduct[]
    meta: { page: string; perPage: string; totalPages: string; hasNextPage: boolean; hasPrevPage: boolean }
  }> {
    const params = {
      ...pagination,
      ...Object.fromEntries(Object.entries(attributeFilters).map(([key, value]) => [key, value.join(',')])),
    }

    const { data } = await instance<{
      items: IProduct[]
      meta: { page: string; perPage: string; totalPages: string; hasNextPage: boolean; hasPrevPage: boolean }
    }>({
      url: API_URL.product(`/by-category/${categorySlug}`),
      method: 'GET',
      params,
    })

    return data
  },

  async createProduct(payload: productPayload): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: API_URL.product(),
      method: 'POST',
      data: payload,
    })

    return data
  },

  async updateProduct(productId: string, payload: productPayload): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: API_URL.product(`/${productId}`),
      method: 'PUT',
      data: payload,
    })

    return data
  },

  async deleteProduct(productId: string): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: API_URL.product(`/${productId}`),
      method: 'DELETE',
    })

    return data
  },
}
