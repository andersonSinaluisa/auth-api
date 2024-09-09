import { IsDate, IsNumber, IsString } from 'class-validator';

export class ReadPermissionDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsString()
  code: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
