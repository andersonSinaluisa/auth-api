import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AES } from 'crypto-js';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('login (POST)', () => {
    const username = AES.encrypt('admin', process.env.KEY_ENCRYPT);
    const password = AES.encrypt('admin', process.env.KEY_ENCRYPT);
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: username,
        password: password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['set-cookie'][0]).toContain('token');
      });
  });
});
