import { OrderService } from '@/order/order.service'
import { UserService } from '@/user/user.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StatisticsService {
  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}

  async getMain(userId: string) {
    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    })

    const totalSpent = await this.orderService.getTotalSpentByUser(userId)

    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'Favorites',
        value: user.favorites.length,
      },
      {
        name: 'Total Spent',
        value: totalSpent,
      },
    ]
  }
}
