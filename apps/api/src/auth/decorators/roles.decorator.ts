import { SetMetadata } from '@nestjs/common'

export const Roles = (role: 'user' | 'admin') => SetMetadata('role', role)
