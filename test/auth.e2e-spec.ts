import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AES } from 'crypto-js';
import * as cookieParser from 'cookie-parser';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.enableCors({
      origin: '*',
      credentials: true,
    });
    await app.init();
  }, 50000);

  it('login (POST)', () => {
    const username = AES.encrypt('admin', process.env.KEY_ENCRYPT);
    const password = AES.encrypt('admin', process.env.KEY_ENCRYPT);
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: username,
        password: password,
      })
      .expect((res) => {
        console.log(res.body);
        expect(res.headers['set-cookie'][0]).toContain('token');
      });
  });
});
