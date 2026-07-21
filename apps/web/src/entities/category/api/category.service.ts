import { instance } from '@/shared/api/api.interceptor'
import { ICategory } from '../types/category.interface'

export const CategoryService = {
  async getAll() {
    const response = await instance<ICategory[]>({
      url: `/categories`,
      method: 'GET',
    })

    return response.data
  },

  async getById(id: string) {
    const response = await instance<ICategory>({
      url: `/categories/:${id}`,
      method: 'GET',
    })

    return response.data
  },

  async getBySlug(slug: string) {
    const response = await instance<ICategory>({
      url: `/categories/by-slug/:${slug}`,
      method: 'GET',
    })

    return response.data
  },

  async create(name: string, parentId?: string) {
    const response = await instance<ICategory>({
      url: `/categories`,
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
      url: `/categories/${id}`,
      method: 'PUT',
      data: {
        name,
      },
    })

    return response.data
  },

  async delete(id: string) {
    const response = await instance<ICategory>({
      url: `/categories/${id}`,
      method: 'DELETE',
    })

    return response.data
  },
}
