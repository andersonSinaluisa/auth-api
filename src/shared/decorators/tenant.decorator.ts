// src/common/decorators/tenant.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const Tenant = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'] || '';
    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return null;

    try {
      const decoded = jwt.decode(token) as { tenantId?: string };
      return decoded?.tenantId || null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  },
);
