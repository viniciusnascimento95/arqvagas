import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Ativa a transformação automática de tipos
      whitelist: true, // Remove campos não definidos no DTO
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('arqvagas API')
    .setDescription('The API description created by Vinicius Fernandes')
    .setVersion('1.0')
    // .addBearerAuth() // Adiciona suporte a Bearer Token
    // .addTag('routes')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Ativar o CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permite somente requisições desta origem
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos HTTP permitidos
    credentials: true, // Se precisar de cookies
  });

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
