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
  UsePipes,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BuyBookDto } from './dto/buy-book.dto';
import { DomainException } from './exceptions/domain.exception';
import { RatingBookDto } from './dto/rating-book.dto';
import { BooksService } from './books.service';
import { EntityNotFoundException } from './exceptions/entity-not-found.exception';
import { AuthorValidPipe } from './dto/validators/author-valid.pipe';

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
  @ApiParam({
    name: 'id',
    example: '55f8b7f6-8a9b-40d2-abc4-3c403025a694'
  })
  @ApiNotFoundResponse()
  findById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      return this.booksService.findOne(id);
    } catch (e) {
      if (e instanceof EntityNotFoundException) {
        throw new NotFoundException("Not found with id " + id, {cause: e});
      }
      throw e;
    }
  }

  @Post()
  @UsePipes(new AuthorValidPipe())
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
