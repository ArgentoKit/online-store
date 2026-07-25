import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail()
  email: string

  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password: string
}

export class RegisterDto extends AuthDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Name is too long (maximum is 50 characters)' })
  name: string

  @MinLength(2, { message: 'Lastname must be at least 2 characters long' })
  @MaxLength(50, { message: 'Lastname is too long (maximum is 50 characters)' })
  @IsString()
  lastName: string
}
