import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PermissionsRepository {
  constructor(private readonly prismaService: PrismaService) { }
  create(createPermissionDto: Prisma.PermissionCreateInput) {
    return this.prismaService.permission.create({
      data: createPermissionDto,
    });
  }

  findAll() {
    return this.prismaService.permission.findMany();
  }

  findOne(id: number) {
    return this.prismaService.permission.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePermissionDto: Prisma.PermissionUpdateInput) {
    return this.prismaService.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
  }

  remove(id: number) {
    return this.prismaService.permission.delete({
      where: { id },
    });
  }
}
