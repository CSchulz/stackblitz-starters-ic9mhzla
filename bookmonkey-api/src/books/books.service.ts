import { Injectable, NotFoundException } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import { randomUUID } from 'crypto';
import { CreateBookDto } from './dto/create-book.dto';
import { BuyBookDto } from './dto/buy-book.dto';
import { RatingBookDto } from './dto/rating-book.dto';
import { DomainException } from './exceptions/domain.exception';
import { EntityNotFoundException } from './exceptions/entity-not-found.exception';

@Injectable()
export class BooksService {
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

    findAll() {
        return this.books;
    }

    findBookByQueryParams(isbn: string) {
        return this.findBookByPredicate((book) => book.isbn === isbn)
    }

    findOne(id: string) {
        return this.findBookByPredicate((book) => book.id === id)
    }

    create(createBookDto: CreateBookDto) {
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

    buy(id: string, body: BuyBookDto) {
        const book = this.findBookByPredicate((book) => book.id === id);

        if (book.amount - body.amount < 0) {
        throw new DomainException(
            `Order cancelled: ${body.amount} copys of "${book.title}" have been ordered, but only ${book.amount} are available. More will be available, soon!`
        );
        }

        book.amount = book.amount - body.amount;
    }

    addRating(id: string, body: RatingBookDto) {
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
        throw new EntityNotFoundException(BookEntity.name, "");
      } else {
        return book;
      }
    }
}
