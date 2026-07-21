import { Controller, Get } from '@nestjs/common'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { OrderService } from './order.service'

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  async getAll(@CurrentUser('id') id: string) {
    return this.orderService.getAll(id)
  }
}
