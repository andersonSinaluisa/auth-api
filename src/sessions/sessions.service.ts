import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionRepository } from './repository/session.repository';
import { orderByFormat } from 'src/shared/utils/orderby-format';
import { EventsService } from 'src/kafka/events.service';
import { SESSION_TERMINATED } from 'src/kafka/events';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class SessionsService {

    constructor(private readonly sessionRepository: SessionRepository,
        private readonly messageService: EventsService,

    ) { }


    async createSession(session: Prisma.SessionUncheckedCreateInput) {
        return this.sessionRepository.create(session);
    }



    async terminateSession(id: number) {
        const res = await this.sessionRepository.remove(id);
        this.messageService.sendMessage(SESSION_TERMINATED, JSON.stringify(res));
        return res;
    }

    async findAll(page: number,
        perPage: number,
        search?: string,
        orderBy?: string[],) {
        return this.sessionRepository.findMany({
            page,
            perPage,
            orderBy: {
                createdAt: orderBy != undefined ? orderByFormat(orderBy, 'createdAt') : undefined,
                status: orderBy != undefined ? orderByFormat(orderBy, 'status') : undefined,
            },
            where: search
                ? {
                    OR: [
                        {
                            ip: {
                                contains: search,
                            },
                            location: {
                                contains: search,
                            },
                            UserAgent: {
                                contains: search,
                            }
                        },
                    ],
                    AND: {
                        deleted: false
                    }
                }
                : {
                    deleted: false,
                },
        });
    }


    async findSessionById(id: string) {

        const session = await this.sessionRepository.findOne(id);
        return session;
    }

    
    async terminateSessionById(id: string) {
        const session = await this.sessionRepository.findOne(id);
        if (!session) {
            throw new UnauthorizedException('Session not found');
        }
        const res = await this.sessionRepository.remove(session.id);
        this.messageService.sendMessage(SESSION_TERMINATED, JSON.stringify(res));
        return res;
    }

   


   




}
