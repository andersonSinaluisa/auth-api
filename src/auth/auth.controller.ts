import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthRequest,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyTokenDto,
} from './dto/auth-request';
import { Public } from './auth.decorator';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: AuthRequest, @Res() res: Response) {
    const response = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    res.cookie('token', response.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
    });

    return res.status(HttpStatus.OK).json(response.data);
  }

  @Public()
  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data.email, data.link_password);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @Public()
  @Post('validate-token')
  async verifyToken(@Body() data: VerifyTokenDto) {
    return this.authService.verifyToken(data.token);
  }
}
