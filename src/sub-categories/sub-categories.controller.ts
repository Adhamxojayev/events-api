import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/sub-category.dto';
import { SubCategoriesService } from './sub-categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get()
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Post()
  create(@Body() body: CreateSubCategoryDto) {
    return this.subCategoryService.create(body);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.subCategoryService.find(parseInt(id));
  }
}
