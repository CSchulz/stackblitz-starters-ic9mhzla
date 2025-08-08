import { Injectable } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { BuyBookDto } from './dto/buy-book.dto';
import { DomainException } from './exceptions/domain.exception';
import { EntityNotFoundException } from './exceptions/entity-not-found.exception';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, FindOptionsWhereProperty } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    protected booksRepository: Repository<BookEntity>,
  ) {}

  findAll() {
    return this.booksRepository.find({ relations: { ratings: true } });
  }

  findBookByQueryParams(isbn: string) {
    return this.findBookByPredicate({isbn});
  }

  findOne(id: string) {
    return this.findBookByPredicate({id});
  }

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.save({
      // define the default values which are not part of the CreateBookDto, yet
      amount: 0,
      price: 0,
      rating: 0,
      ...createBookDto,
    });
  }

  async buy(id: string, body: BuyBookDto) {
    const book = await this.findBookByPredicate({id});

    if (book.amount - body.amount < 0) {
      throw new DomainException(
        `Order cancelled: ${body.amount} copys of "${book.title}" have been ordered, but only ${book.amount} are available. More will be available, soon!`,
      );
    }

    book.amount = book.amount - body.amount;

    this.booksRepository.save(book);
  }

  private findBookByPredicate(predicate: FindOptionsWhere<Omit<BookEntity, 'id'>> & FindOptionsWhereProperty<{id: any}>) {
    return this.booksRepository.findOneByOrFail(predicate).catch(() => {
      throw new EntityNotFoundException(BookEntity.name, predicate);
    });
  }
}
