import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';

@Module({
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController]
})
export class SubCategoriesModule {}
