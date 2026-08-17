import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { PaginationService } from '@/pagination/pagination.service'
import { PrismaService } from '@/prisma.service'
import { CategoryTreeService } from '@/shared/modules/category-tree.service'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'

@Module({
  imports: [CacheModule.register()],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, PaginationService, CategoryTreeService],
})
export class ProductModule {}
