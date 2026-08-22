import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'generated/prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '@/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    })
  }

  async validate({ id }: Pick<User, 'id'>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        lastName: true,
        avatarPath: true,
        phone: true,
        role: true,
      },
    })

    if (!user) return null

    return user
  }
}
