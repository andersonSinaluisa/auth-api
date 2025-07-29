import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    // 1. Extraer token de cookie o header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      this.logger.warn('Token no encontrado en la solicitud');
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      // 2. Verificar el token
      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_secret',
      );

      // 3. Guardar el tenantId y otros datos del usuario en el request
      req['tenantId'] = decoded.tenantId;
      req['user'] = decoded;

      next();
    } catch (error) {
      this.logger.error('Error al verificar el token', error);
      throw new UnauthorizedException('Token inválido');
    }
  }
}
