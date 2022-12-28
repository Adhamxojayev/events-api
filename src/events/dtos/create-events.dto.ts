import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';

export class CreateEventsDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  eventDate: Date;

  @IsString()
  eventHour: string;

  @IsString()
  @IsOptional()
  eventType: string;

  @IsString()
  eventLink: string;

  @IsString()
  organizerProfes: string;

  @IsString()
  organizerName: string;

  @IsString()
  organizerTel: string;

  @IsString()
  eventDescription: string;

  @IsString()
  eventImage: string;

  @IsString()
  eventBody: string;

  @IsNumber()
  subCategorySubCategoryId: number;
}
