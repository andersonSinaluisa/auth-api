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
  @IsNumber()
  appId: number;
  @IsString()
  description: string;
  app?: {
    id: number;
    name: string;
    description: string;
    url: string;
    createdAt: Date;
    updatedAt;
  };
}
