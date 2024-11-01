import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://api-nestjs-ttt-challenge.onrender.com', // Cambia esto a la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true,
  }));
  await app.listen(3000);
}
bootstrap();
