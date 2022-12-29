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
        subCategory: {
          events: true,
        },
      },
      select: {
        categoryId: true,
        categoryName: true,
        subCategory: {
          subCategoryId: true,
          subCategoryName: true,
          events: {
            eventId: true,
            eventDate: true,
            eventHour: true,
            organizerName: true,
            organizerProfes: true,
            organizerTel: true,
            eventDescription: true,
            eventImage: true,
            eventBody: true,
            eventLink: true,
            eventType: true,
          },
        },
      },
    });
  }

  create(body: any) {
    const data = this.categoriesRepo.create(body);

    return this.categoriesRepo.save(data);
  }

  async find(id: number) {
    const category = await this.categoriesRepo.findOne({
      where: { categoryId: id },
      relations: { subCategory: true },
      select: {
        categoryId: true,
        categoryName: true,
        subCategory: {
          subCategoryId: true,
          subCategoryName: true,
        },
      },
    });

    return category;
  }
}
