import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { AppRepository } from './repository/app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  create(createAppDto: CreateAppDto, tenantId: string) {
    return this.appRepository.create(
      {
        description: createAppDto.description,
        name: createAppDto.name,
        url: createAppDto.url,
        createdAt: new Date(),
        deleted: false,
        deletedAt: null,
      },
      tenantId,
    );
  }

  findAll(tenantId: string) {
    return this.appRepository.findAll(tenantId);
  }

  findOne(id: number, tenantId: string) {
    return this.appRepository.findOne(id, tenantId);
  }

  update(id: number, updateAppDto: UpdateAppDto, tenantId: string) {
    return this.appRepository.update(id, updateAppDto, tenantId);
  }

  remove(id: number, tenantId: string) {
    return this.appRepository.remove(id, tenantId);
  }
}
