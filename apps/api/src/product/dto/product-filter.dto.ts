import { IsEnum, IsNumberString, IsOptional } from 'class-validator'
import { PaginationDto } from '@/pagination/pagination.dto'
import { ProductSortByEnum } from './get-all-product.dto'

export class ProductFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductSortByEnum)
  sort?: ProductSortByEnum

  @IsOptional()
  @IsNumberString()
  priceMin?: string

  @IsOptional()
  @IsNumberString()
  priceMax?: string
}
