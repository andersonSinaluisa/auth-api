import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SessionDto } from '../sessions/dto/session.dto';
import { Public } from '../shared/decorators';
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

    @Delete('terminate/:id')
    terminateSession(@Param('id') id: string) {
        return this.authService.terminateSession(id);
    }


    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const sessionId = req.cookies.sessionId;
        const token = req.cookies.token;
        await this.authService.terminateSession(sessionId);
        res.clearCookie('sessionId');
        res.clearCookie('token');
        res.clearCookie('userId');
        res.json({ message: 'Logged out successfully' });
    }


    @Post('profile')
    async getProfile(@Req() req: Request, @Res() res: Response) {
        
        
        
    }
}
