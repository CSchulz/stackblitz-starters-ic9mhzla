import { Body, Controller, Param, Post } from '@nestjs/common';
import { BookRatingsService } from './book-ratings.service';
import { BooksService } from '../books/books.service';
import { RatingBookDto } from '../books/dto/rating-book.dto';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('book-ratings')
export class BookRatingsController {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookRatingsService: BookRatingsService
  ) {}

  @ApiOkResponse({ description: 'OK' })
  @ApiParam({
    name: 'id',
    example: '55f8b7f6-8a9b-40d2-abc4-3c403025a694'
  })
  @Post('books/:bookId')
  async create(@Param('bookId') bookId: string, @Body() body: RatingBookDto) {
    const book = await this.booksService.findOne(bookId);

    const rating = await this.bookRatingsService.create(book, body.rating);

    return rating.id;
  }
}
