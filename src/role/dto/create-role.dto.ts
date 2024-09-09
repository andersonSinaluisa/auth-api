import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsArray()
  @ApiProperty()
  permissions: number[];
}
