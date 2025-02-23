import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Movies')
    .setDescription('Документация проекта Movies')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors({ origin: true, });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
