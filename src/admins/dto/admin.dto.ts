import { IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
