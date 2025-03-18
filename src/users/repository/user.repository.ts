import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginateFunction,
  paginator,
} from 'src/shared/utils/pagination';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) { }

  async create(user: Prisma.UserUncheckedCreateInput): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: user,
    });
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users;
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
  }): Promise<PaginatedResult<User>> {
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

  async findOne(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(
    id: number,
    user: Prisma.UserUncheckedUpdateInput,
  ): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: {
        id,
      },
      data: user,
    });
    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const user = await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    return user;
  }
}
