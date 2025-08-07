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
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(protected booksService: BooksService) {}

  @Get()
  @ApiOkResponse({ description: 'OK', type: BookEntity, isArray: true })
  getAll() {
    return this.booksService.findAll();
  }

  @Get('find')
  @ApiOkResponse({ description: 'OK', type: BookEntity })
  @ApiNotFoundResponse()
  find(@Query('isbn') isbn: string) {
    return this.booksService.findBookByQueryParams(isbn);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'OK', type: BookEntity })
  @ApiNotFoundResponse()
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Book created', type: BookEntity })
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Put(':id/buy')
  @HttpCode(204)
  buy(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: BuyBookDto) {
    this.booksService.buy(id, body);
  }

  @Put(':id/rating')
  @HttpCode(204)
  addRating(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: RatingBookDto) {
    this.booksService.addRating(id, body);
  }
}
