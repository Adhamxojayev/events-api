import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
