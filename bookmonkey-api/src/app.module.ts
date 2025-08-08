import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CorrelationIdModule } from './correlation-id/correlation-id.module';
import { EnvVariablesModule } from './configuration/env-variables.module';

@Module({
  imports: [BooksModule, CorrelationIdModule, EnvVariablesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
