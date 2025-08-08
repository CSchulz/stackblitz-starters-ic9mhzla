import { DomainException } from "./domain.exception";

export class EntityNotFoundException extends DomainException {
    constructor(public readonly className: string, public readonly id: object) {
        super(`Entity ${className} not found with selector ${JSON.stringify(id)}`);
    }
}
