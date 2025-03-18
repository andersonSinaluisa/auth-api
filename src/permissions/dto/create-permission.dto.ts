import { IsNumber, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  appId: number;

  @IsString()
  description: string;
}
