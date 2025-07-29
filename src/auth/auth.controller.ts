import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SessionDto } from '../sessions/dto/session.dto';
import { Public } from '../shared/decorators/is-public';
import { VerifyDto } from './dto/verify.dto';
import { Tenant } from 'src/shared/decorators/tenant.decorator';
@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Tenant() tenantId: string,
    @Body() data: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!tenantId) {
      return res.status(400).json({ message: 'Tenant ID is required' });
    }
    const isProduction = process.env.NODE_ENV === 'production';
    const result = await this.authService.login(
      req,
      data.email,
      data.password,
      tenantId,
    );
    res.cookie('sessionId', result.session.session_id, {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'strict',
    });

    res.cookie('token', result.token, {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'strict',
    });
    res.cookie('userId', JSON.stringify(result.user), {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'strict',
    });

    res.json(result.session as SessionDto);
  }

  @Post('verify')
  async verify(@Body() data: VerifyDto, @Tenant() tenantId: string) {
    const sessionId = data.sessionId;
    const token = data.token;
    const result = await this.authService.verify(sessionId, token, tenantId);
    return result;
  }

  @Delete('terminate/:id')
  terminateSession(@Param('id') id: string, @Tenant() tenantId: string) {
    return this.authService.terminateSession(id, tenantId);
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Tenant() tenantId: string,
  ) {
    const sessionId = req.cookies.sessionId;
    await this.authService.terminateSession(sessionId, tenantId);
    res.clearCookie('sessionId');
    res.clearCookie('token');
    res.clearCookie('userId');
    res.json({ message: 'Logged out successfully' });
  }
}
