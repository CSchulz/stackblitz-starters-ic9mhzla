import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { EnvVariablesService } from '../configuration/env-variables.service';
 
@Controller('healthz')
export class HealthzController {
  constructor(
    private health: HealthCheckService,
    private dbHelathIndicator: TypeOrmHealthIndicator,
    private envVariables: EnvVariablesService
  ) {}
 
  @Get()
  @HealthCheck()
  check() {
    const datbaseName = this.envVariables.get('database_name');
    return this.health.check([() => this.dbHelathIndicator.pingCheck(datbaseName)]);
  }
}