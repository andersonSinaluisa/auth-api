import { App, Prisma } from '@prisma/client';
import { CreateAppDto } from 'src/app/dto/create-app.dto';

export class AppMapper {
  static toEntity(data: CreateAppDto) {
    return {
      description: data.description,
      name: data.name,
      url: data.url,
      createdAt: new Date(),
    } as Prisma.AppCreateInput;
  }

  static toDto(data: App) {
    return {
      description: data.description,
      name: data.name,
      url: data.url,
    } as CreateAppDto;
  }
}