import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsInt, Max, Min } from 'class-validator';

export class RatingBookDto {
  @ApiProperty()
  @Min(1, {
    message: 'Rating discarded: The given rating $value does not fit in the range 1-5.'
  })
  @Max(5, {
    message: 'Rating discarded: The given rating $value does not fit in the range 1-5.'
  })
  @IsInt()
  rating: number;
}
