import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/shared/decorators';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly blacklistService: BlacklistService,
        private readonly jwtService: JwtService,
        private reflector: Reflector
    ) {
        
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        

        if (!token) {
            throw new UnauthorizedException("Token no proporcionado");
        }

        const isBlacklisted = await this.blacklistService.isBlacklisted(token);
        if (isBlacklisted) {
            throw new UnauthorizedException("Token inválido, sesión cerrada");
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET,
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return  true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const [type, token] = authHeader.split(' ');
            if (type === 'Bearer') {
                return token;
            }
        }

        // 🔥 Extraer desde las Cookies
        return request.cookies?.token;
    }
}
