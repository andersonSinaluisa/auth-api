import { Controller, Get, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Tenant } from 'src/shared/decorators/tenant.decorator';

@Controller('sessions')
export class SessionsController {
  constructor(private sessionSession: SessionsService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('search') search: string,
    @Query('orderBy') orderBy: string[],
    @Tenant() tenantId: string,
  ) {
    return this.sessionSession.findAll(
      tenantId,
      page,
      perPage,
      search,
      orderBy,
    );
  }
}
