import { Auth } from '@/auth/decorators/auth.decorator';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.bySlug(slug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.byId(id)
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async create() {
    return this.categoryService.create()
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CategoryDto) {
    return this.categoryService.update(id, dto)
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id)
  }
}
