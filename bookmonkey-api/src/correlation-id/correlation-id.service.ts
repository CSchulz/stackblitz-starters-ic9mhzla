import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

interface CorrelationIdServiceData { correlationId: string };

@Injectable()
export class CorrelationIdService extends AsyncLocalStorage<CorrelationIdServiceData> {
    public static readonly headerName = 'X-CORRELATION-ID';
}
