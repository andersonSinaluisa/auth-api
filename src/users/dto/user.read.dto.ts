import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
import { ReadRoleDto } from 'src/role/dto/read-role.dto';
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

  @IsDate()
  @ApiProperty()
  last_login: Date | null;

  @IsBoolean()
  @ApiProperty()
  is_active: boolean;


  @ApiProperty()
  role?: ReadRoleDto
}
