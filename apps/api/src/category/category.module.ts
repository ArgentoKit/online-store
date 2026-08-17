import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { CategoryTreeService } from '@/shared/modules/category-tree.service'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [CacheModule.register()],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CategoryTreeService],
  exports: [CategoryTreeService],
})
export class CategoryModule {}
