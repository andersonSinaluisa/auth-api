import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Solo permite este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Permite enviar cookies y autenticación
  });
  app.use(cookieParser()); // Agregar middleware para parsear las cookies

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
