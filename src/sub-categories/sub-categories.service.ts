import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/categories/categories.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/sub-category.dto';
import { SubCategories } from './sub-categories.entity';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(SubCategories)
    public subCategoryRepo: Repository<SubCategories>,
  ) {}

  findAll() {
    return this.subCategoryRepo.find();
  }

  async create(body: CreateSubCategoryDto) {
    const categories = new Categories();
    categories.categoryId = body.categoryCategoryId;

    const data = this.subCategoryRepo.create(body);
    data.category = categories;
    return await this.subCategoryRepo.save(data);
  }
}
