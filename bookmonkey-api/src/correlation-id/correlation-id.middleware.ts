import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CorrelationIdService } from './correlation-id.service';
import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(protected correlationIdService: CorrelationIdService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const headerValue = req.header(CorrelationIdService.headerName);

    const correlationId = typeof headerValue === 'string' ? headerValue : randomUUID();

    console.log(`${typeof headerValue === 'string' ? 'Reuse' : 'Use'} correlationId: ${correlationId}`);

    res.setHeader(CorrelationIdService.headerName, correlationId);

    this.correlationIdService.run({correlationId}, () => next());
  }
}
