import { SetMetadata } from '@nestjs/common'

export const Roles = (role: 'USER' | 'ADMIN') => SetMetadata('role', role)
