import { ApiProperty } from '@nestjs/swagger';
import { EntityProperties } from 'src/core/types/entity-properties';

export class BookEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public title: string;
  @ApiProperty()
  public isbn: string;
  @ApiProperty()
  public authors: string[];
  @ApiProperty()
  public price: number;
  @ApiProperty()
  public amount: number;
  // @ApiProperty()
  // public thumbnail: string | undefined;
  @ApiProperty({ required: false })
  public thumbnail?: string;
  @ApiProperty()
  public rating: number = 0;

  constructor(props?: EntityProperties<Omit<BookEntity, 'rating'>>) {
    if (!props) return;

    Object.assign(this, props);
  }
}
