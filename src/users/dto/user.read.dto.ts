import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
export class UserResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsDate()
  @ApiProperty()
  created_at: Date;

  @IsDate()
  @ApiProperty()
  updated_at: Date;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsNumber()
  @ApiProperty()
  role_id: number;
}
