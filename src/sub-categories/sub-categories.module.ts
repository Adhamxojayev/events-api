import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategories } from './sub-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategories])],
  providers: [SubCategoriesService],
  controllers: [SubCategoriesController],
})
export class SubCategoriesModule {}
