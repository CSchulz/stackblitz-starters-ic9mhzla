import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './books/exceptions/domain-exception.filter';
import { EntityNotFoundExceptionFilter } from './books/exceptions/entity-not-found-exception.filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import compression from '@fastify/compress'
import { constants } from 'zlib';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await app.register(compression, {
    encodings: ['zstd', 'br', 'gzip'],
    threshold: 0.01,
    brotliOptions: {
      params: {[constants.BROTLI_PARAM_QUALITY]: 4}
    }
  })

  const options = new DocumentBuilder()
    .setTitle('bookmoney API')
    .setDescription('The bookmonkey API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: 'api-docs/open-api.json',
    yamlDocumentUrl: 'api-docs/open-api.yaml',
  });

  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalFilters(new DomainExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
