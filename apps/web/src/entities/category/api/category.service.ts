import { instance } from '@/shared/api/api.interceptor'
import { API_URL } from '@/shared/config/api.config'
import { ICategory } from '../types/category.interface'

export const CategoryService = {
  async getAll() {
    const response = await instance<ICategory[]>({
      url: API_URL.category(),
      method: 'GET',
    })

    return response.data
  },

  async getById(id: string) {
    const response = await instance<ICategory>({
      url: API_URL.category(`/${id}`),
      method: 'GET',
    })

    return response.data
  },

  async getBySlug(slug: string) {
    const response = await instance<ICategory>({
      url: API_URL.category(`/by-slug/${slug}`),
      method: 'GET',
    })

    return response.data
  },

  async create(name: string, parentId?: string) {
    const response = await instance<ICategory>({
      url: API_URL.category(),
      method: 'POST',
      data: {
        name,
        parentId,
      },
    })

    return response.data
  },

  async update(id: string, name: string) {
    const response = await instance<ICategory>({
      url: API_URL.category(`/${id}`),
      method: 'PUT',
      data: {
        name,
      },
    })

    return response.data
  },

  async delete(id: string) {
    const response = await instance<ICategory>({
      url: API_URL.category(`/${id}`),
      method: 'DELETE',
    })

    return response.data
  },
}
