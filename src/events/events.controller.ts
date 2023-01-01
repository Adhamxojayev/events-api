import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { UpdateEventsDto } from './dtos/update-events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(parseInt(id));
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

  @Get('/image/:filename')
  sendImageEvents(@Param('filename') filename: any, @Res() res) {
    return res.sendFile(resolve('uploads', filename));
  }

  @Delete('/admin/:id')
  delete(@Param('id') id: string) {
    return this.eventService.delete(parseInt(id));
  }

  @Patch('/admin/:id')
  update(@Param('id') id: string, @Body() body: UpdateEventsDto) {
    return this.eventService.update(parseInt(id), body.eventStatus);
  }

  @Get('/admin/all')
  findAllAdmin() {
    return this.eventService.findAllAdmin();
  }
}
