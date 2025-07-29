import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionRepository } from './repository/session.repository';
import { orderByFormat } from '../shared/utils/orderby-format';
import { EventsService } from '../kafka/events.service';
import { SESSION_TERMINATED } from '../kafka/events';
import { Prisma } from '@prisma/client';
import { SessionMapper } from './entities/mappers/session.mapper';

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly messageService: EventsService,
  ) {}

  async createSession(
    session: Prisma.SessionUncheckedCreateInput,
    tenantId: string,
  ) {
    return this.sessionRepository.create(session, tenantId);
  }

  async terminateSession(id: number, tenantId: string) {
    const res = await this.sessionRepository.remove(id, tenantId);
    this.messageService.sendMessage(SESSION_TERMINATED, JSON.stringify(res));
    return res;
  }

  async findAll(
    tenantId: string,
    page: number,
    perPage: number,
    search?: string,
    orderBy?: string[],
  ) {
    const sessions = await this.sessionRepository.findMany({
      page,
      perPage,
      orderBy: {
        createdAt:
          orderBy != undefined
            ? orderByFormat(orderBy, 'createdAt')
            : undefined,
        status:
          orderBy != undefined ? orderByFormat(orderBy, 'status') : undefined,
      },
      include: {
        user: true,
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
                },
              },
            ],
            AND: {
              deleted: false,
              tenantId,
            },
          }
        : {
            deleted: false,
            tenantId,
          },
    });

    return {
      ...sessions,
      data: sessions.data.map((ses) => SessionMapper.toDto(ses)),
    };
  }

  async findSessionById(id: string, tenantId: string) {
    const session = await this.sessionRepository.findOne(id, tenantId);
    return session;
  }

  async terminateSessionById(id: string, tenantId: string) {
    const session = await this.sessionRepository.findOne(id, tenantId);
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }
    const res = await this.sessionRepository.remove(session.id, tenantId);
    this.messageService.sendMessage(SESSION_TERMINATED, JSON.stringify(res));
    return res;
  }
}
