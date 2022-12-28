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
    private subCategoryRepo: Repository<SubCategories>,
  ) {}

  findAll() {
    return this.subCategoryRepo.find({
      relations: {
        events: true,
      },
      select: {
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
    });
  }

  async create(body: CreateSubCategoryDto) {
    const categories = new Categories();
    categories.categoryId = body.categoryCategoryId;

    const data = this.subCategoryRepo.create(body);
    data.category = categories;
    return await this.subCategoryRepo.save(data);
  }

  find(id: number) {
    return this.subCategoryRepo.findOne({
      where: { subCategoryId: id },
      relations: {
        events: true,
      },
      select: {
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
    });
  }
}
