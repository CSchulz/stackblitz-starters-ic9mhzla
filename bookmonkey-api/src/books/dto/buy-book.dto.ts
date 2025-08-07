import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class BuyBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  amount: number;
}
