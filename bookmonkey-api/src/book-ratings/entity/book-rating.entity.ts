import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { BookEntity } from '../../books/entities/book.entity';

@Entity('book-ratings')
export class BookRatingEntity {
  @ApiProperty()
  // @PrimaryGeneratedColumn('uuid')
  // public id: string;
  // this one is needed if you are using sqlite (but this is not the best solution for high concurrent systems)
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @ApiProperty()
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty()
  @Column({ type: 'smallint' })
  public rating: number;

  @ApiProperty()
  @ManyToOne(() => BookEntity, book => book.ratings)
  public book: BookEntity;
}
