import { PaginationDto } from "@/pagination/pagination.dto"
import { IsEnum, IsOptional, IsString } from "class-validator"

export enum ProductSortByEnum {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export class GetAllProductDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ProductSortByEnum)
  sort?: ProductSortByEnum

  @IsOptional()
  @IsString()
  searchTerm?: string
}