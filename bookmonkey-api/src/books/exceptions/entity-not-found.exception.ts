import { DomainException } from "./domain.exception";

export class EntityNotFoundException extends DomainException {
    constructor(public readonly className: string, public readonly id: string) {
        super(`Entity ${className} not found with id ${id}`);
    }
}