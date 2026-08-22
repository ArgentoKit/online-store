import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { Roles } from './roles.decorator'

export function Auth(role: 'user' | 'admin' = 'user') {
  return applyDecorators(UseGuards(AuthGuard('jwt'), RolesGuard), Roles(role ?? 'user'))
}
