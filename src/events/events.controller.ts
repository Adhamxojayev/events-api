import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEventsDto } from './dtos/create-events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(public eventService: EventsService) {}

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Post()
  create(@Body() body: CreateEventsDto) {
    return this.eventService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(parseInt(id));
  }
}
