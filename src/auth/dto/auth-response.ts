import { IsString } from 'class-validator';
import { UserResponseDto } from '../../users/dto/user.read.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  data: UserResponseDto;
}
