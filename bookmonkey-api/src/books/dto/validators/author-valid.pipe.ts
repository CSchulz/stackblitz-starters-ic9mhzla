import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { EntityProperties } from 'src/core/types/entity-properties';
import { CreateBookDto } from '../create-book.dto';

@Injectable()
export class AuthorValidPipe implements PipeTransform {
  transform(value: Partial<EntityProperties<CreateBookDto>>, metadata: ArgumentMetadata) {
    if (value.authors) {
      const invalidValues = value.authors.filter((author) => author.length === 0)
        .map((invalidAuthor) => {
          return {
            value: invalidAuthor,
            index: value.authors!.indexOf(invalidAuthor),
          }
        });

      if (invalidValues.length) {
        throw new BadRequestException({
          message: 'Found invalid author entries',
          items: invalidValues,
        })
      }
    }
  }
}
