import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventsDto } from './dtos/create-events.dto';
import { SubCategories } from 'src/sub-categories/sub-categories.entity';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events) private eventRepo: Repository<Events>,
  ) {}

  findAll() {
    return this.eventRepo.find({ where: { eventStatus: 'confirmation' } });
  }

  async create(body: CreateEventsDto) {
    const subCategories = new SubCategories();
    subCategories.subCategoryId = body.subCategorySubCategoryId;

    const event = this.eventRepo.create(body);
    event.subCategory = subCategories;
    return await this.eventRepo.save(event);
  }

  async delete(id: number) {
    const event = await this.findOne(id);
    if (!event) {
      return new NotFoundException('event not found');
    }
    return this.eventRepo.softDelete(id);
  }

  async findOne(eventId: number) {
    const event = await this.eventRepo.findOneBy({
      eventId,
      eventStatus: 'confirmation',
    });
    return event;
  }
}
