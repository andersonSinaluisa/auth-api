import {  Controller, Get, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service';


@Controller('sessions')
export class SessionsController {

    constructor(private sessionSession: SessionsService ) { }

      @Get()
      findAll(
        @Query('page') page: number,
        @Query('perPage') perPage: number,
        @Query('search') search: string,
        @Query('orderBy') orderBy: string[],
      ) {
        return this.sessionSession.findAll(page, perPage, search, orderBy);
      }

}
