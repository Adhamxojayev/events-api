import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
