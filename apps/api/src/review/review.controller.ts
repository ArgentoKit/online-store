import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @Post('product/:productId')
  @Auth()
  async createReview(@CurrentUser('id') id: string, @Body() dto: ReviewDto, @Param('productId') productId: string) {
    return this.reviewService.create(id, dto, productId)
  }
}
