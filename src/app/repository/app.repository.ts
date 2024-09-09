import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

export class AppRepository {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: Prisma.AppCreateInput) {
    return this.prismaService.app.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppWhereUniqueInput;
    where?: Prisma.AppWhereInput;
    orderBy?: Prisma.AppOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.app.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.AppWhereUniqueInput) {
    return this.prismaService.app.findUnique({ where });
  }

  async update(params: {
    where: Prisma.AppWhereUniqueInput;
    data: Prisma.AppUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.app.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.AppWhereUniqueInput) {
    return this.prismaService.app.delete({ where });
  }

  async findFirst(params: {
    where?: Prisma.AppWhereInput;
    orderBy?: Prisma.AppOrderByWithRelationInput;
  }) {
    const { where, orderBy } = params;
    return this.prismaService.app.findFirst({ where, orderBy });
  }
}
