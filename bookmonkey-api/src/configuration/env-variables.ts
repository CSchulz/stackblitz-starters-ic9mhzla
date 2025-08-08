import { z } from 'zod';
import { DatabaseType } from 'typeorm';

/**export interface EnvVariables {
    database_server: string;
    database_name: string;
    database_port: string;
    database_username: string;
    database_password: string;
}*/

// just a helper to have the driver also safe
const databaseTypeValues: readonly DatabaseType[] = [
  'aurora-mysql', 'mysql', 'postgres', 'mariadb', 'sqlite', 'sqljs', 'mssql',
  'oracle', 'cordova', 'react-native', 'expo', 'nativescript',
  'cockroachdb', 'aurora-mysql', 'aurora-postgres', 'sap', 'spanner'
];

export const EnvVariablesSchema = z.object({
  database_driver: z.enum(databaseTypeValues),
  database_server: z.string().nonempty(),
  database_name: z.string().nonempty(),
  database_port: z.coerce.number().positive(),
  database_username: z.string().nonempty(),
  database_password: z.string().nonempty()
});
 
export type EnvVariables = z.infer<typeof EnvVariablesSchema>;
