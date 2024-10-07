import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Especifica el origen del frontend
    credentials: true, // Permitir el envío de cookies o credenciales
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
