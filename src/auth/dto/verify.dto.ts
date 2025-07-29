import { IsString } from 'class-validator';

export class VerifyDto {
  @IsString()
  sessionId: string;
  @IsString()
  token: string;
}
