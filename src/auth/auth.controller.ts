import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SessionDto } from 'src/sessions/dto/session.dto';
import { Public } from 'src/shared/decorators';
import { VerifyDto } from './dto/verify.dto';
@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() data: LoginDto, @Req() req: Request, @Res() res: Response) {
        const result = await this.authService.login(req, data.email, data.password);
        res.cookie('sessionId', result.session.session_id, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
        })

        res.cookie('token', result.token, {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
        })
        res.cookie('userId', JSON.stringify(result.user), {
            httpOnly: false,
            secure: false,
            sameSite: 'strict',
        })

        res.json(result.session as SessionDto);
    }

    @Post('verify')
    async verify(@Body() data: VerifyDto) {
        const sessionId = data.sessionId;
        const token = data.token;
        const result = await this.authService.verify(sessionId, token);
        return result;
    }
}
