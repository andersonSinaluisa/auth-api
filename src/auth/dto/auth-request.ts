import { IsEmail, IsString } from 'class-validator';

export class AuthRequest {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class ForgotPasswordDto {
  email: string;
  link_password: string;
}
export class ResetPasswordDto {
  token: string;
  newPassword: string;
}
