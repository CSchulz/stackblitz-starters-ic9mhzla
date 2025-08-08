import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CorrelationIdService } from './correlation-id.service';
import { randomUUID } from 'crypto';
import {FastifyRequest, FastifyReply} from 'fastify';
import { ServerResponse } from 'http';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(protected correlationIdService: CorrelationIdService) {}

  use(req: FastifyRequest, res: ServerResponse, next: NextFunction) {
    const headerValue = req.headers[CorrelationIdService.headerName.toLowerCase()];

    const correlationId = typeof headerValue === 'string' ? headerValue : randomUUID();

    console.log(`${typeof headerValue === 'string' ? 'Reuse' : 'Use'} correlationId: ${correlationId}`);

    res.setHeader(CorrelationIdService.headerName, correlationId);

    this.correlationIdService.run({correlationId}, () => next());
  }
}
