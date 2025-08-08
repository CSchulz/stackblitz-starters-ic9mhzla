import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './env-variables';

@Injectable()
export class EnvVariablesService {
  constructor(private readonly configService: ConfigService) {}
 
  get<TEnvKey extends keyof EnvVariables>(key: TEnvKey): EnvVariables[TEnvKey] {
    const envVar = this.configService.get(key) as EnvVariables[TEnvKey];
 
    if (!envVar) {
      throw new Error(`Expected env variable ${key} to be defined.`);
    }
 
    return envVar;
  }
}
