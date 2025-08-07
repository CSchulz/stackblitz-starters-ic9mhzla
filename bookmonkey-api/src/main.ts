import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './books/exceptions/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
