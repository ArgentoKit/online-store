import { OrderService } from '@/order/order.service';
import { PrismaService } from '@/prisma.service';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, PrismaService, UserService, OrderService],
})
export class StatisticsModule {}
