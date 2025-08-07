import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Response,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BuyBookDto } from './dto/buy-book.dto';
import { DomainException } from './exceptions/domain.exception';
import { RatingBookDto } from './dto/rating-book.dto';

@Controller('books')
export class BooksController {

  private books: BookEntity[] = [
    new BookEntity({
      id: randomUUID(),
      isbn: '978-0061976209',
      title: 'The Whale',
      authors: ['Samuel D. Hunter'],
      price: 16.99,
      amount: 1000,
    }),
    new BookEntity({
      id: randomUUID(),
      isbn: '978-0061976209',
      title: 'The Whale',
      authors: ['Samuel D. Hunter'],
      price: 16.99,
      amount: 1000,
    }),
  ];

  @Get()
  @ApiOkResponse({ description: 'OK', type: BookEntity, isArray: true })
  getAll() {
    return this.books;
  }

  @Get('find')
  @ApiOkResponse({ description: 'OK', type: BookEntity })
  @ApiNotFoundResponse()
  find(@Query('isbn') isbn: string) {
    return this.findBookByPredicate((book) => book.isbn === isbn);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'OK', type: BookEntity })
  @ApiNotFoundResponse()
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.findBookByPredicate((book) => book.id === id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Book created', type: BookEntity })
  createBook(@Body() createBookDto: CreateBookDto) {
    const newBook = new BookEntity({
      id: randomUUID(),
      title: createBookDto.title,
      isbn: createBookDto.isbn,
      authors: createBookDto.authors,
      amount: 0,
      price: 0,
    });

    this.books.push(newBook);

    return newBook;
  }

  @Put(':id/buy')
  @HttpCode(204)
  buy(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: BuyBookDto) {
    const book = this.findBookByPredicate((book) => book.id === id);

    if (book.amount - body.amount < 0) {
      throw new DomainException(
        `Order cancelled: ${body.amount} copys of "${book.title}" have been ordered, but only ${book.amount} are available. More will be available, soon!`
      );
    }

    book.amount = book.amount - body.amount;
  }

  @Put(':id/rating')
  @HttpCode(204)
  addRating(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: RatingBookDto) {
    const book = this.findBookByPredicate((book) => book.id === id);

    if (book.rating == 0) {
      book.rating = body.rating;
    } else {
      book.rating = (book.rating + body.rating) / 2
    }
  }

  private findBookByPredicate(predicate: (book: BookEntity) => boolean) {
    const book = this.books.find((book) => predicate(book));

    if (!book) {
      throw new NotFoundException();
    } else {
      return book;
    }
  }
}
