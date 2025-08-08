import { Module } from '@nestjs/common';
import { HealthzController } from './healthz.controller';
import { TerminusModule } from '@nestjs/terminus';

@Module({
    controllers: [HealthzController],
    imports: [TerminusModule],
})
export class HealthzModule {}
