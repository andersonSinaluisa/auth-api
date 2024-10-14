import { AppClient, Prisma } from '@prisma/client';
import { CreateAppDto } from '../../dto/create-app.dto';

export class AppMapper {
  static toEntity(data: CreateAppDto) {
    return {
      description: data.description,
      name: data.name,
      url: data.url,
      createdAt: new Date(),
    } as Prisma.AppClientCreateInput;
  }

  static toDto(data: AppClient) {
    return {
      description: data.description,
      name: data.name,
      url: data.url,
    } as CreateAppDto;
  }
}
