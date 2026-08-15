import { IsNumberString, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '@/pagination/pagination.dto'

export class ProductFilterDto extends PaginationDto {
  @IsOptional() @IsString() sort?: string
  @IsOptional() @IsNumberString() priceMin?: string
  @IsOptional() @IsNumberString() priceMax?: string
}
