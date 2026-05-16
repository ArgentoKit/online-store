import { IsNumberString, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsNumberString()
  page?: string

  @IsOptional()
  @IsNumberString()
  perPage?: string
}
