import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRequest {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  @IsString()
  link_password: string;
}
export class ResetPasswordDto {
  @IsString()
  @ApiProperty()
  token: string;
  @IsString()
  @ApiProperty()
  newPassword: string;
}


export class VerifyTokenDto {
  @IsString()
  @ApiProperty()
  token: string;
}