import { IsString } from 'class-validator';

export class UpdateAppDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  url: string;
}
