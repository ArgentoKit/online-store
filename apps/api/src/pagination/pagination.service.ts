import { Injectable } from '@nestjs/common'
import { PaginationDto } from './pagination.dto'

@Injectable()
export class PaginationService {
  getPagination(dto: PaginationDto, defaultPerPage = 20, maxPerPage = 100) {
    const page = Math.max(dto.page ? +dto.page : 1, 1)
    const perPage = Math.min(Math.max(dto.perPage ? +dto.perPage : defaultPerPage, 1), maxPerPage)

    const skip = (page - 1) * perPage

    return { page, perPage, skip }
  }

  getMeta(total: number, page: number, perPage: number) {
    const totalPages = Math.ceil(total / perPage) || 1
    return {
      total,
      page,
      perPage,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  }
}
