import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { LoginDto } from '../auth/dto/login.dto';
import { Request,Response } from 'express';
import { SessionDto } from './dto/session.dto';

@Controller('sessions')
export class SessionsController {

    constructor(private authService: SessionsService) { }

 

      @Get()
      findAll(
        @Query('page') page: number,
        @Query('perPage') perPage: number,
        @Query('search') search: string,
        @Query('orderBy') orderBy: string[],
      ) {
          return this.authService.findAll(page, perPage, search, orderBy);
      }
}
