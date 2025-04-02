import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class AppRepository{
    constructor(private readonly prismaService: PrismaService){}

    async create(data: Prisma.AppCreateInput){
        return this.prismaService.app.create({
            data
        })
    }

    async findAll(){
        return this.prismaService.app.findMany({
            select:{
                _count:{
                    select:{
                        permissions: true
                    }
                },
                id: true,
                name: true,
                description: true,
                url: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    }

    async findOne(id: number){
        return this.prismaService.app.findUnique({
            where: {id}
        })
    }

    async update(id: number, data: Prisma.AppUpdateInput){
        return this.prismaService.app.update({
            where: {id},
            data
        })
    }

    async remove(id: number){
        return this.prismaService.app.update({
            where: {id},
            data: {deletedAt: new Date(),
                deleted: true}
        })
    }
}