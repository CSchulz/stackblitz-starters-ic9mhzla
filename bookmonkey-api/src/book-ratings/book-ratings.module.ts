import { Module } from '@nestjs/common';
import { BookRatingsController } from './book-ratings.controller';
import { BookRatingsService } from './book-ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRatingEntity } from './entity/book-rating.entity';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookRatingEntity]), BooksModule],
  controllers: [BookRatingsController],
  providers: [BookRatingsService]
})
export class BookRatingsModule {}
