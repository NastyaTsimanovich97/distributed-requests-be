import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const docs = new DocumentBuilder()
    .setTitle('Requests Service')
    .setDescription('Requests API service')
    .setVersion('0.1')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(configService.get('port'));
}
bootstrap();
