import { UserResponseDto } from '../../users/dto/user.read.dto';

export class SessionDto {
  id: number;
  session_id: string;
  userId: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  ip: string;
  UserAgent: string;
  location: string;
  device: string;
  status: string;
  user?: UserResponseDto;
}
