import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Auth } from '@/auth/decorators/auth.decorator'
import { PaginationDto } from '@/pagination/pagination.dto'
import { GetAllProductDto } from './dto/get-all-product.dto'
import { ProductDto } from './dto/product.dto'
import { ProductFilterDto } from './dto/product-filter.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto)
  }

  @Get(':id')
  @Auth()
  async getProduct(@Param('id') id: string) {
    return this.productService.byId(id)
  }

  @Get('similar/:id')
  async getSimilar(@Param('id') id: string) {
    return this.productService.getSimilar(id)
  }

  @Get('by-slug/:slug')
  async getProductBySlug(@Param('slug') slug: string) {
    return this.productService.bySlug(slug)
  }

  @Get('by-category/:categorySlug')
  async getProductsByCategory(
    @Param('categorySlug') categorySlug: string,
    @Query() dto: ProductFilterDto,
    @Req() req: Request
  ) {
    const knownKeys = ['page', 'perPage', 'sort', 'priceMin', 'priceMax']
    const attributeFilters: Record<string, string[]> = {}

    for (const [key, value] of Object.entries(req.query)) {
      if (!knownKeys.includes(key) && typeof value === 'string') {
        attributeFilters[key] = value.split(',')
      }
    }

    return this.productService.byCategorySlug(categorySlug, dto, attributeFilters)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async createProduct(@Body() dto: ProductDto) {
    return this.productService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id)
  }
}
