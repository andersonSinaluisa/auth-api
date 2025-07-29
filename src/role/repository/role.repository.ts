import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from '../../shared/utils/pagination';

@Injectable()
export class RoleRepository {
  constructor(private prismaService: PrismaService) {}

  // Crear un rol con tenantId
  async create(role: Prisma.RoleUncheckedCreateInput, tenantId: string) {
    const newRole = await this.prismaService.role.create({
      data: {
        ...role,
        tenantId,
      },
    });
    return newRole;
  }

  async findAll(tenantId: string) {
    const roles = await this.prismaService.role.findMany({
      where: {
        tenantId,
        deleted: false,
      },
      include: {
        permissions: true,
      },
    });
    return roles;
  }

  async findMany({
    tenantId,
    where,
    orderBy,
    page,
    perPage = 10,
  }: {
    tenantId: string;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatedResult<Role>> {
    const paginate: PaginateFunction = paginator({ perPage });

    return paginate(
      this.prismaService.role,
      {
        where: {
          ...where,
          tenantId,
          deleted: false,
        },
        orderBy,
        include: {
          permissions: true,
        },
      },
      {
        page,
      },
    );
  }

  async findOne(id: number, tenantId: string) {
    const role = await this.prismaService.role.findFirst({
      where: {
        id,
        tenantId,
        deleted: false,
      },
      include: {
        permissions: true,
      },
    });
    return role;
  }

  async update(
    id: number,
    role: Prisma.RoleUncheckedUpdateInput,
    tenantId: string,
  ) {
    // Verificamos existencia y pertenencia
    const existing = await this.prismaService.role.findFirst({
      where: { id, tenantId, deleted: false },
    });
    if (!existing) return null;

    const updatedRole = await this.prismaService.role.update({
      where: { id },
      data: role,
    });
    return updatedRole;
  }

  async remove(id: number, tenantId: string) {
    const existing = await this.prismaService.role.findFirst({
      where: { id, tenantId, deleted: false },
    });
    if (!existing) return null;

    const role = await this.prismaService.role.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deleted: true,
      },
    });
    return role;
  }
}
