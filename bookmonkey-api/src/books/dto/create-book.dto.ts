import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, ArrayMinSize, Validate } from 'class-validator';
import { AuthorValidValidator } from './validators/author-valid.validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  public title: string;
  @ApiProperty()
  @MinLength(13)
  public isbn: string;
  @ApiProperty()
  @ArrayMinSize(1)
  @Validate(AuthorValidValidator)
  public authors: string[];
}
