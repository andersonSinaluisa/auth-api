import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginateFunction, paginator } from '../../shared/utils/pagination';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    user: Prisma.UserUncheckedCreateInput,
    tenantId: string,
  ): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        ...user,
        tenantId,
      },
    });
    return newUser;
  }

  async findByEmail(email: string, tenantId: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
        tenantId,
      },
    });
    return user;
  }

  async findAll(tenantId: string): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        tenantId,
      },
    });
    return users;
  }
  async findMany({
    where,
    orderBy,
    include,
    page,
    perPage = 10,
    tenantId,
  }: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    include?: Prisma.UserInclude;
    page?: number;
    perPage?: number;
    tenantId?: string;
  }) {
    const paginate: PaginateFunction = paginator({ perPage: perPage });

    return paginate(
      this.prismaService.user,
      {
        where: {
          ...where,
          tenantId,
        },
        orderBy,
        include,
      },
      {
        page,
      },
    );
  }

  async findOne(id: number, tenantId: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
        tenantId,
      },
    });
    return user;
  }

  async update(
    id: number,
    tenantId: string,
    user: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
        tenantId,
      },
      data: user,
    });
    return updatedUser;
  }

  async remove(id: number, tenantId: string): Promise<User> {
    const user = await this.prismaService.user.delete({
      where: {
        id,
        tenantId,
      },
    });
    return user;
  }
}
