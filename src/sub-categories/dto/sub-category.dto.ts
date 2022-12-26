import { IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  subCategoryName: string;

  @IsNumber()
  categoryCategoryId: number;
}
