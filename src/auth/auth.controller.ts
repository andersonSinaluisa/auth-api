import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth-request';
import { Public } from './auth.decorator';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
}
