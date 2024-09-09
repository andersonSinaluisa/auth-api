import { IsString } from 'class-validator';

export class CreateAppDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  url: string;
}
