import { instance } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import { IProduct, productPayload } from '../types/product.interface'

export const ProductService = {
  async getAllProducts(): Promise<IProduct[]> {
    const { data } = await instance<IProduct[]>({
      url: API_URL.product(),
      method: 'GET',
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

  async getProductByCategory(categorySlug: string): Promise<IProduct[]> {
    const { data } = await instance<IProduct[]>({
      url: API_URL.product(`/by-category/${categorySlug}`),
      method: 'GET',
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
