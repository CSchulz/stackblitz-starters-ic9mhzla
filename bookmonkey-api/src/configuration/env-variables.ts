import { z } from 'zod';

/**export interface EnvVariables {
    database_server: string;
    database_name: string;
    database_port: string;
    database_username: string;
    database_password: string;
}*/
 
export const EnvVariablesSchema = z.object({
  database_server: z.string().nonempty(),
  database_name: z.string().nonempty(),
  database_port: z.coerce.number().positive(),
  database_username: z.string().nonempty(),
  database_password: z.string().nonempty()
});
 
export type EnvVariables = z.infer<typeof EnvVariablesSchema>;
