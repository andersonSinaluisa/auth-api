import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest } from './dto/auth-request';
import { Public } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @Public()
  @Post('login')
  signIn(@Body() signInDto: AuthRequest) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
