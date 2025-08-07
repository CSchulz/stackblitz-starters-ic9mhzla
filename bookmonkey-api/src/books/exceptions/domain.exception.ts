import { BadRequestException } from '@nestjs/common';

export class DomainException extends BadRequestException {
  constructor(msg: string) {
    super(msg);
  }
}
