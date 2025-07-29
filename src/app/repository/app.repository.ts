import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class AppRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.AppCreateInput, tenantId) {
    return this.prismaService.app.create({
      data: {
        ...data,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prismaService.app.findMany({
      select: {
        _count: {
          select: {
            permissions: true,
          },
        },
        id: true,
        name: true,
        description: true,
        url: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        tenantId,
        deleted: false,
      },
    });
  }

  async findOne(id: number, tenantId: string) {
    return this.prismaService.app.findUnique({
      where: { id, tenantId },
    });
  }

  async update(id: number, data: Prisma.AppUpdateInput, tenantId: string) {
    return this.prismaService.app.update({
      where: { id, tenantId },
      data,
    });
  }

  async remove(id: number, tenantId: string) {
    return this.prismaService.app.update({
      where: { id, tenantId },
      data: { deletedAt: new Date(), deleted: true },
    });
  }
}
