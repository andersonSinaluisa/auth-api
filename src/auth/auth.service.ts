import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from 'src/users/entities/mappers/user.mapper';
import { AuthResponse } from './dto/auth-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserRepository,
    private jwtService: JwtService,
  ) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
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
}
