import { Controller, Get } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private subCategoryService: SubCategoriesService) {}

  @Get()
  findAll() {
    return this.subCategoryService.findAll();
  }
}
