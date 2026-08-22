import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<'user' | 'admin'>('role', context.getHandler())
    if (!requiredRole || requiredRole === 'user') return true

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException('Недостаточно прав')
    }

    return true
  }
}
