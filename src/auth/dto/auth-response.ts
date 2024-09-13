import { IsString } from 'class-validator';
import { UserResponseDto } from 'src/users/dto/user.read.dto';

export class AuthResponse {
  @IsString()
  access_token: string;

  data: UserResponseDto;
}
