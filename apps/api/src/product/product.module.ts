import { PaginationService } from '@/pagination/pagination.service'
import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
