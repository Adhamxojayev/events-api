import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MinDate } from 'class-validator';

export class CreateEventsDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  eventDate: Date;

  @IsString()
  eventHour: string;

  @IsString()
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

  @IsString()
  categories: string;

  @IsString()
  subCategories: string;
}
