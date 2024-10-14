import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from '../users/entities/mappers/user.mapper';
import { AuthResponse } from './dto/auth-response';
import { SALT_OR_ROUNDS } from '../utils/config';
import { ResetPasswordDto } from './dto/auth-request';
import { EventsService } from 'src/events/events.service';
import { TOPIC_MESSAGE_RESET_PASSWORD } from 'src/const';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserRepository,
    private jwtService: JwtService,
    private events: EventsService,
  ) {}

  async signIn(username: string, pass: string): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(username);
    if (user == null) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    const payload = {
      sub: user.id,
      username: user.email,
      role: user.role_id,
      iss: new Date(),
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      data: UserMapper.toResponse(user),
    } as AuthResponse;
  }
  async forgotPassword(email: string, link_password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Generar un token de restablecimiento (puede ser un JWT o algo personalizado)
    const resetToken = this.jwtService.sign(
      { userId: user.id },
      { secret: link_password, expiresIn: '1h' },
    );

    // Enviar correo con el token
    const resetPasswordUrl = `${link_password}${resetToken}`;

    const payload = {
      app_code: 'auth-api',
      to: email,
      subject: 'Recuperar contraseña',
      template: 'reset-password',
      context: {
        resetPasswordUrl: resetPasswordUrl,
      },
    };
    this.events.sendMessage(TOPIC_MESSAGE_RESET_PASSWORD, payload);
    return {
      message: 'Enviado correctamente',
    };
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
    const { token, newPassword } = resetPasswordDto;

    // Verificar el token
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    // Encontrar al usuario por el id del token
    const user = await this.usersService.findOne(payload.userId);
    if (!user) {
      throw new Error('Invalid token');
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, SALT_OR_ROUNDS);

    // Actualizar la contraseña del usuario
    await this.usersService.update(user.id, {
      password: hashedPassword,
    });

    return { message: 'Password has been updated' };
  }
}
