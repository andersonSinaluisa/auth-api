import { Injectable } from "@nestjs/common";
import { Permission, Prisma } from "@prisma/client";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { PaginatedResult, PaginateFunction, paginator } from "../../shared/utils/pagination";
import { ReadPermissionDto } from "../dto/read-permission.dto";


@Injectable()
export class PermissionRepository {
    constructor(private prismaService: PrismaService) { }
    create(createPermissionDto: Prisma.PermissionCreateInput) {
        return this.prismaService.permission.create({
            data: createPermissionDto,
        });
    }
    async findMany({
        where,
        orderBy,
        page,
        perPage = 10,
    }: {
        where?: Prisma.PermissionWhereInput;
        orderBy?: Prisma.PermissionOrderByWithRelationInput;
        page?: number;
        perPage?: number;
    }) {
        const paginate: PaginateFunction = paginator({ perPage: perPage });

        const res = paginate<ReadPermissionDto,any>(
            this.prismaService.permission,
            {
                where,
                orderBy,
                include: {
                    app: true,
                },
            },
            {
                page,
            },
            
        );
        return res;
    }
    async findOne(id: number) {
        return await this.prismaService.permission.findUnique({
            where: { id , deleted: false},
            include: {
                app: true,
            }
        });
    }

    update(id: number, updatePermissionDto: Prisma.PermissionUpdateInput) {
        return this.prismaService.permission.update({
            where: { id },
            data: updatePermissionDto,
        });
    }

    async remove(id: number) {
        return await this.prismaService.permission.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                deleted: true,
            }
        });
    }
}