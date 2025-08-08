import { ApiProperty } from '@nestjs/swagger';
import type { EntityProperties } from 'src/core/types/entity-properties';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookRatingEntity } from '../../book-ratings/entity/book-rating.entity';

@Entity('books')
export class BookEntity {
  @ApiProperty()
  // @PrimaryGeneratedColumn('uuid')
  // public id: string;
  // this one is needed if you are using sqlite (but this is not the best solution for high concurrent systems)
  @PrimaryGeneratedColumn('increment')
  public id: number;
    
  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  public title: string;
    
  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  public isbn: string;
    
  @ApiProperty()
  @Column({ type: 'simple-array' })
  public authors: string[];
  
  @ApiProperty()
  @Column({ type: 'real' })
  public price: number;
  
  @ApiProperty()
  @Column({ type: 'real' })
  public amount: number;
  
  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  public thumbnail?: string;
  // @ApiProperty()
  // public thumbnail: string | undefined;
  
  @ApiProperty()
  @Column({ type: 'real' })
  public rating: number;

  constructor(props?: EntityProperties<Omit<BookEntity, 'rating'>>) {
    if (!props) return;

    Object.assign(this, props);
  }
}
