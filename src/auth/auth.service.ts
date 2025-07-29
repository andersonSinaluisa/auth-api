import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EventsService } from '../kafka/events.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { getUserLocation } from '../shared/utils/location';
import { SessionsService } from '../sessions/sessions.service';
import { randomUUID } from 'crypto';
import { SESSION_CREATED } from '../kafka/events';
import { Request } from 'express';
import { PayloadEntity } from './entities/Payload';
import { BlacklistService } from './blacklist.service';
import { getDeviceInfo } from '../shared/utils/device';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly messageService: EventsService,
    private jwtService: JwtService,
    private sessionService: SessionsService,
    private readonly blacklistService: BlacklistService,
  ) {}
  async login(req: Request, email: string, pass: string, tenantId: string) {
    const user = await this.userService.findByEmail(email, tenantId);
    if (!user) {
      throw new UnauthorizedException('Usuario y/o contraseña incorrectos', {
        cause: new Error('Usuario y/o contraseña incorrectos'),
        description: 'root',
      });
    }

    const { password, ...userData } = user;

    const isMatch = await bcrypt.compare(pass, password);
    if (!isMatch) {
      throw new UnauthorizedException('Usuario y/o contraseña incorrectos', {
        cause: new Error('Usuario y/o contraseña incorrectos'),
        description: 'root',
      });
    }
    const location = await getUserLocation(req.ip);
    const sessionUid = randomUUID();
    const payload: PayloadEntity = {
      email: user.email,
      sub: user.id,
      role: user.role_id,
      device: req.headers['user-agent'],
      ip: req.ip,
      location: location,
      session_id: sessionUid,
      UserAgent: req.headers['user-agent'],
      tenantId: user.tenantId,
    };

    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload);
    const device = getDeviceInfo(req.headers['user-agent']);
    const session = await this.sessionService.createSession(
      {
        userId: user.id,
        device: device,
        ip: req.ip,
        location: location,
        UserAgent: req.headers['user-agent'],
        status: 'active',
        session_id: sessionUid,
        token: token,
        tenantId: user.tenantId,
      },
      tenantId,
    );

    this.messageService.sendMessage(SESSION_CREATED, JSON.stringify(session));

    return { token, refreshToken, user: userData, session: session };
  }

  async terminateSession(session_id: string, tenantId: string) {
    const session = await this.sessionService.findSessionById(
      session_id,
      tenantId,
    );

    this.sessionService.terminateSessionById(session_id, tenantId);

    this.blacklistService.addToBlacklist(session.token);

    return session;
  }

  async recoveryPassword(email: string) {
    this.messageService.sendMessage(
      'send-mail',
      JSON.stringify({
        app_code: 'auth-api',
        to: email,
        subject: 'Recuperar contraseña',
        template: 'recovery-password',
        context: {
          url: 'https://example.com/recovery-password',
          token: randomUUID(),
        },
      }),
    );
  }

  async verify(sessionId: string, token: string, tenantId: string) {
    const session = await this.sessionService.findSessionById(
      sessionId,
      tenantId,
    );
    if (!session) {
      throw new UnauthorizedException('Sesión no válida', {
        cause: new Error('Sesión no válida'),
        description: 'root',
      });
    }

    const isBlacklisted = await this.blacklistService.isBlacklisted(token);

    if (isBlacklisted) {
      throw new UnauthorizedException('Sesión no válida', {
        cause: new Error('Sesión no válida'),
        description: 'root',
      });
    }
    let payload: PayloadEntity | null = null;
    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Sesión no válida', {
        cause: new Error('Sesión no válida'),
        description: 'root',
      });
    }
    if (!payload) {
      throw new UnauthorizedException('Sesión no válida', {
        cause: new Error('Sesión no válida'),
        description: 'root',
      });
    }

    if (payload.session_id !== session.session_id || session.token !== token) {
      throw new UnauthorizedException('Sesión no válida', {
        cause: new Error('Sesión no válida'),
        description: 'root',
      });
    }

    return session;
  }
}
