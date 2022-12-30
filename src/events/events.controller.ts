import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { CreateEventsDto } from './dtos/create-events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    const { mimetype } = file;
    const fileName = Date.now() + file.originalname;
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(mimetype)) {
      return new BadRequestException('file type invalid');
    } else {
      writeFileSync(resolve('uploads', fileName), file.buffer);
      body.eventImage = fileName;
      return this.eventService.create(body);
    }
  }

  @Get(':filename')
  sendImageEvents(@Param('filename') filename: any, @Res() res) {
    return res.sendFile(resolve('uploads', filename));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(parseInt(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.delete(parseInt(id));
  }
}
