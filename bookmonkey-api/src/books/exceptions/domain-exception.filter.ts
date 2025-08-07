import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { DomainException } from './domain.exception';
import { EntityNotFoundException } from './entity-not-found.exception';
import { Request, Response } from 'express';
import { InvalidUuidException } from './invalid-uuid.exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter<DomainException> {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = this.determineStatusCode(exception);

    response
      .status(status)
      .json(
        this.buildResponseBody(request, exception)
      );
  }

  protected buildResponseBody(request: Request, exception: DomainException) {
    return {
      statusCode: this.determineStatusCode(exception),
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    };
  }

  protected determineStatusCode(exception: DomainException) {
    // Please be aware switch only support concrete implementations
    // If you want to use inheritance or base classes you need to switch to instanceof
    switch (exception.constructor) {
      case EntityNotFoundException:
        return HttpStatus.NOT_FOUND;
      
      case InvalidUuidException:
        return HttpStatus.BAD_REQUEST;

      default:
        return HttpStatus.BAD_REQUEST
    }
  }
}
