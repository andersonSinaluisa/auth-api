import { env } from 'process';

export const SALT_OR_ROUNDS = 10;
export const jwtConstants = {
  secret: env.JWT_SECRET,
};
