import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '@/config/jwt.config'
import { PrismaService } from '@/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RolesGuard } from './guards/roles.guard'
import { JwtStrategy } from './jwt.strategy'

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, RolesGuard],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  exports: [RolesGuard],
})
export class AuthModule {}
