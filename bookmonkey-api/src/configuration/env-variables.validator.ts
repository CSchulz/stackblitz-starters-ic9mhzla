import { z } from 'zod';
import { EnvVariables, EnvVariablesSchema } from './env-variables';
 
export function validateEnvVariables(rawEnvVars: Record<string, unknown>): EnvVariables {
  const result = z.safeParse(EnvVariablesSchema, rawEnvVars);
 
  if (!result.success) {
    const errorMessage = z.prettifyError(result.error);
    throw new Error(errorMessage);
  }
 
  return result.data;
}