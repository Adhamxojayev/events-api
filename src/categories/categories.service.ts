import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories) public categoriesRepo: Repository<Categories>,
  ) {}

  findAll() {
    return this.categoriesRepo.find({
      relations: {
        subCategory: true,
      },
    });
  }

  create(body: any) {
    const data = this.categoriesRepo.create(body);

    return this.categoriesRepo.save(data);
  }
}
