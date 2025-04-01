import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { PaginateFunction, paginator } from "src/shared/utils/pagination";

@Injectable()
export class SessionRepository {
    constructor(private prismaService: PrismaService) { }



    async create(session: Prisma.SessionUncheckedCreateInput) {
        const newSession = await this.prismaService.session.create({
            data: session
        });
        return newSession;
    }

    async findMany({
        where,
        orderBy,
        page,
        perPage = 10,
    }: {
        where?: Prisma.SessionWhereInput;
        orderBy?: Prisma.SessionOrderByWithRelationInput;
        page?: number;
        perPage?: number;
    }) {
        const paginate: PaginateFunction = paginator({ perPage: perPage });

        const res = paginate(
            this.prismaService.session,
            {
                where,
                orderBy,

            },
            {
                page,
            },

        );
        return res;
    }

    async findOne(id: string) {
        const session = await this.prismaService.session.findUnique({
            where: {
                session_id:id,
                deleted: false
            },
            include: {
                user: true,
            }
        });
        return session;
    }

    async remove(id: number) {
        const session = await this.prismaService.session.update({
            where: {
                id,
            },
            data: {
                updatedAt: new Date(),
                deleted: true,
            },
        });
        return session;
    }
}