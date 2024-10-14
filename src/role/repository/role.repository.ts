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
  constructor(private prismaService: PrismaService) { }

  // Create a new role
  async create(role: Prisma.RoleUncheckedCreateInput) {
    const newRole = await this.prismaService.role.create({
      data: role,
    });
    return newRole;
  }

  async findAll() {
    const roles = await this.prismaService.role.findMany();
    return roles;
  }

  async findMany({
    where,
    orderBy,
    page,
    perPage = 10,
  }: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }): Promise<PaginatedResult<Role>> {
    const paginate: PaginateFunction = paginator({ perPage: perPage });

    return paginate(
      this.prismaService.user,
      {
        where,
        orderBy,
      },
      {
        page,
      },
    );
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
    return role;
  }

  async update(id: number, role: Prisma.RoleUncheckedUpdateInput) {
    const updatedRole = await this.prismaService.role.update({
      where: {
        id,
      },
      data: role,
    });
    return updatedRole;
  }

  async remove(id: number) {
    const role = await this.prismaService.role.delete({
      where: {
        id,
      },
    });
    return role;
  }
}
