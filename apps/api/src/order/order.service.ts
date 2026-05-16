import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getTotalSpentByUser(userId: number): Promise<number> {
    const rows = await this.prisma.$queryRaw<{ total: number }[]>`
      SELECT COALESCE(SUM(oi.price * oi.quantity), 0)::float AS total
      FROM "Order_item" oi
      JOIN "Order" o ON o.id = oi.order_id
      WHERE o.user_id = ${userId}
    `

    return rows[0]?.total ?? 0
  }
}
