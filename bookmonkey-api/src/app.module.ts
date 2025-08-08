import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CorrelationIdModule } from './correlation-id/correlation-id.module';

@Module({
  imports: [BooksModule, CorrelationIdModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
