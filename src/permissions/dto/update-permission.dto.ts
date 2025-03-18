import { IsNumber, IsString } from 'class-validator';

export class UpdatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  appId: number;

  @IsString()
  description: string;
}
