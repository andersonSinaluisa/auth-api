import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { AppRepository } from './repository/app.repository';

@Injectable()
export class AppService {

  constructor(private readonly appRepository: AppRepository) { }
  create(createAppDto: CreateAppDto) {
    return 'This action adds a new app';
  }

  findAll() {
    return this.appRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} app`;
  }

  update(id: number, updateAppDto: UpdateAppDto) {
    return `This action updates a #${id} app`;
  }

  remove(id: number) {
    return `This action removes a #${id} app`;
  }
}
