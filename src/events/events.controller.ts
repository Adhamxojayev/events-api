import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: resolve('uploads'),
        filename: (req, file, cb) => {
          const fileNameSplit = file.originalname.split('.');
          const fileExt = fileNameSplit[fileNameSplit.length - 1];
          cb(null, `${Date.now()}.${fileExt}`);
        },
      }),
    }),
  )
  @Post()
  create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return { file: file, body: body };
  }

  // @Post()
  // create(@Body() body: CreateEventsDto) {
  //   return this.eventService.create(body);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(parseInt(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.delete(parseInt(id));
  }
}
