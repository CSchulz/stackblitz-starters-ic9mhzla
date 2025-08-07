import { DomainException } from "./domain.exception";

export class InvalidUuidException extends DomainException {
}

export const invalidUuidExceptionFactory = (errors: string) => new InvalidUuidException(errors);