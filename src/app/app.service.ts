import { Injectable } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { AppRepository } from './repository/app.repository';
import { orderByFormat } from '../shared/utils/orderby-format';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) { }
  create(createAppDto: CreateAppDto) {
    return this.appRepository.create(createAppDto);
  }

  findAll(page: number, perPage: number, search?: string, orderBy?: string[]) {
    return this.appRepository.findAll({
      orderBy: {
        description: orderByFormat(orderBy, 'description'),
        url: orderByFormat(orderBy, 'url'),
        name: orderByFormat(orderBy, 'name'),
      },
      page: page,
      perPage: perPage,
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  findOne(id: number) {
    return this.appRepository.findOne({
      id: id,
    });
  }

  update(id: number, updateAppDto: UpdateAppDto) {
    return this.appRepository.update({
      data: updateAppDto,
      where: {
        id: id,
      },
    });
  }

  remove(id: number) {
    return this.appRepository.remove({
      id: id,
    });
  }
}
