import { Global, Module } from '@nestjs/common';
import { EnvVariablesService } from './env-variables.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './env-variables.validator';

@Global()
@Module({
  imports: [ConfigModule.forRoot({validate: validateEnvVariables})],
  providers: [EnvVariablesService],
  exports: [EnvVariablesService]
})
export class EnvVariablesModule {}
