import { BadRequestException, Injectable } from '@nestjs/common';
import { orderByFormat } from '../shared/utils/orderby-format';
import { PermissionRepository } from './repository/permission.repository';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { PermissionMapper } from './entities/mappers/permission.mapper';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly repository: PermissionRepository) { }
  async create(createPermissionDto: CreatePermissionDto) {

    
    const exist = await this.repository.findMany({
      where:{
        name: createPermissionDto.name,
        deleted: false,
        appId: createPermissionDto.appId
      }
    })
    if(exist.data.length > 0){
      throw new BadRequestException('Ya existe un permiso con ese nombre para esa aplicación',{
        cause: new Error('Ya existe un permiso con ese nombre para esa aplicación'),
        description: 'name'
      });
    }

    const existCode = await this.repository.findMany({
      where:{
        code: createPermissionDto.code,
        deleted: false,
      }
    })

    if(existCode.data.length > 0){
      throw new BadRequestException('Ya existe un permiso con ese código',{
        cause: new Error('Ya existe un permiso con ese código'),
        description: 'code'
      });
    }

    return await this.repository.create(PermissionMapper.toEntity(createPermissionDto));
  }

  findAll(
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string[],
  ) {
    return this.repository.findMany({
      page,
      perPage,
      orderBy: {
        name: orderBy !=undefined? orderByFormat(orderBy, 'name'):undefined,
        code: orderBy != undefined ? orderByFormat(orderBy, 'code') : undefined,
        id: orderBy != undefined ? orderByFormat(orderBy, 'id') : undefined,
        createdAt: orderBy != undefined  ? orderByFormat(orderBy, 'createdAt') : undefined,
      },
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                },
              },
              {
                code: {
                  contains: search,
                },
              },
            ],
            AND:{
              deleted: false
            }
          }
       :  {
          deleted: false
       },
    });
  }

  findOne(id: number) {
   
    return this.repository.findOne(id);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const exist = await this.repository.findMany({
      where:{
        id: id,
        deleted: false
      }
    })
    if(exist.data.length == 0){
      throw new BadRequestException('No existe el permiso',{
        cause: new Error('No existe el permiso'),
        description: 'id'
      });
    }

    const verification = await this.repository.findMany({
      where:{
        deleted: false,
        NOT:{
          id: id
        },
        OR:[
          {
            name: updatePermissionDto.name.toString(),
            appId: updatePermissionDto.appId
          },
          {
            code: updatePermissionDto.code.toString()
          }
        ]
      }
    })

    if (verification.data.length > 0) {
      throw new BadRequestException('Ya existe un permiso con ese nombre o código para esa aplicación', {
        cause: new Error('Ya existe un permiso con ese nombre o código para esa aplicación'),
        description: 'name'
      });
    }
    
    
    

    return this.repository.update(id, {
      name: updatePermissionDto.name,
      code: updatePermissionDto.code,
      description: updatePermissionDto.description,
      app: {
        connect:  {
          id: updatePermissionDto.appId
        }
      }
    });
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
