import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { EntityNotFoundException } from './entity-not-found.exception';
import { Request, Response } from 'express';

@Catch(EntityNotFoundException)
export class EntityNotFoundExceptionFilter implements ExceptionFilter<EntityNotFoundException> {
  catch(exception: EntityNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(HttpStatus.NOT_FOUND)
      .json({
        statusCode: HttpStatus.NOT_FOUND,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message
      });
  }
}
