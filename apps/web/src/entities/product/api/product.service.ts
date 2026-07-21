import { instance } from '@/shared/api/api.interceptor'
import { IProduct, productPayload } from '../types/product.interface'

export const ProductService = {
  async getAllProducts(): Promise<IProduct[]> {
    const { data } = await instance<IProduct[]>({
      url: '/products',
      method: 'GET',
    })

    return data
  },

  async getProductById(productId: string): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: `/products/${productId}`,
      method: 'GET',
    })

    return data
  },

  async getSimilarProduct(productId: string): Promise<IProduct[]> {
    const { data } = await instance<IProduct[]>({
      url: `/products/similar/${productId}`,
      method: 'GET',
    })

    return data
  },

  async getProductBySlug(slug: string) {
    const { data } = await instance<IProduct>({
      url: `/products/by-slug/${slug}`,
      method: 'GET',
    })

    return data
  },

  async getProductByCategory(categorySlug: string): Promise<IProduct[]> {
    const { data } = await instance<IProduct[]>({
      url: `/products/by-category/${categorySlug}`,
      method: 'GET',
    })

    return data
  },

  async createProduct(payload: productPayload): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: '/products',
      method: 'POST',
      data: payload,
    })

    return data
  },

  async updateProduct(productId: string, payload: productPayload): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: `/products/${productId}`,
      method: 'PUT',
      data: payload,
    })

    return data
  },

  async deleteProduct(productId: string): Promise<IProduct> {
    const { data } = await instance<IProduct>({
      url: `/products/${productId}`,
      method: 'DELETE',
    })

    return data
  },
}
