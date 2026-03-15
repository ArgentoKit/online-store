import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  refreshToken: string
}
