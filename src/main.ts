import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    //set localhost 4200
    origin: 'http://localhost:5173',
    credentials: true, // Permite el envío de cookies
  });

  const config = new DocumentBuilder()
    .setTitle('Autenticación API')
    .setDescription('Api para administración de usuarios y autenticación')
    .setVersion('1.0')
    .addTag('auth-api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
