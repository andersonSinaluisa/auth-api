import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { AppRepository } from './repository/app.repository';

@Injectable()
export class AppService {

  constructor(private readonly appRepository: AppRepository) { }
  create(createAppDto: CreateAppDto) {
    return this.appRepository.create({
      description: createAppDto.description,
      name: createAppDto.name,
      url: createAppDto.url,
      createdAt: new Date(),
      deleted: false,
      deletedAt: null,
      
    });
  }

  findAll() {
    return this.appRepository.findAll();
  }

  findOne(id: number) {
    return this.appRepository.findOne(id);
  }

  update(id: number, updateAppDto: UpdateAppDto) {
    return this.appRepository.update(id, updateAppDto);
  }

  remove(id: number) {
    return this.appRepository.remove(id);
  }
}
