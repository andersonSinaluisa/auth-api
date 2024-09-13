import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { PaginateFunction, paginator } from 'src/shared/utils/pagination';

@Injectable()
export class AppRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: Prisma.AppClientCreateInput) {
    return this.prismaService.appClient.create({ data });
  }

  async findAll(params: {
    where?: Prisma.AppClientWhereInput;
    orderBy?: Prisma.AppClientOrderByWithRelationInput;
    page?: number;
    perPage?: number;
  }) {
    const paginate: PaginateFunction = paginator({ perPage: params.perPage });
    return paginate(
      this.prismaService.appClient,
      {
        where: params.where,
        orderBy: params.orderBy,
      },
      {
        page: params.page,
      },
    );
  }

  async findOne(where: Prisma.AppClientWhereUniqueInput) {
    return this.prismaService.appClient.findUnique({ where });
  }

  async update(params: {
    where: Prisma.AppClientWhereUniqueInput;
    data: Prisma.AppClientUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.appClient.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.AppClientWhereUniqueInput) {
    return this.prismaService.appClient.delete({ where });
  }

  async findFirst(params: {
    where?: Prisma.AppClientWhereInput;
    orderBy?: Prisma.AppClientOrderByWithRelationInput;
  }) {
    const { where, orderBy } = params;
    return this.prismaService.appClient.findFirst({ where, orderBy });
  }
}
