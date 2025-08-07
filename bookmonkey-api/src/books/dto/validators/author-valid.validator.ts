import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { join } from "path";

@ValidatorConstraint({name: 'authorValid'})
export class AuthorValidValidator implements ValidatorConstraintInterface {
    validate(authors: string[], validationArguments?: ValidationArguments | undefined): boolean | Promise<boolean> {
        if (!Array.isArray(authors)) {
            return true;
        }
        const invalidAuthors = this.findInvalidValues(authors);

      return invalidAuthors.length ? false : true;
    }
    defaultMessage(validationArguments: ValidationArguments): string {
        const authors = validationArguments.value as string[]
        const invalidAuthors = this.findInvalidValues(authors);
        return `Invalid author(s): ${invalidAuthors.map(({index, value}) => `'${value}' at index ${index}`).join(', ')}`
    }

    private findInvalidValues(value: string[]) {
        return value.filter((author) => author.length === 0)
        .map((invalidAuthor) => {
          return {
            value: invalidAuthor,
            index: value.indexOf(invalidAuthor),
          }
        })
    }
}