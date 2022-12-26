import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Events) public eventRepo: Repository<Events>) {}

  findAll() {
    return this.eventRepo.find();
  }

  create(body: any) {
    const event = this.eventRepo.create(body);

    return this.eventRepo.save(event);
  }

  async delete(id: number) {
    const event = await this.findOne(id);
    if (!event) {
      return new NotFoundException('event not found');
    }
    return this.eventRepo.softDelete(id);
  }

  async findOne(eventId: number) {
    const event = await this.eventRepo.findOneBy({ eventId });
    return event;
  }
}
