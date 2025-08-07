import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  public title: string;
  @ApiProperty()
  @MinLength(13)
  public isbn: string;
  @ApiProperty()
  @ArrayMinSize(1)
  public authors: string[];
}
