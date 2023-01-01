import { IsString } from 'class-validator';

export class UpdateEventsDto {
  @IsString()
  eventStatus: string;
}
