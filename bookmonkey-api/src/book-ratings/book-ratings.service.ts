import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookRatingEntity } from './entity/book-rating.entity';
import { BookEntity } from '../books/entities/book.entity';

@Injectable()
export class BookRatingsService {
  constructor(
    @InjectRepository(BookRatingEntity)
    protected bookRatingEntityRepository: Repository<BookRatingEntity>,
  ) {}

  async create(book: BookEntity, rating: number) {
    return this.bookRatingEntityRepository.save({book: book, rating});
  }
}
