import { DataSource } from 'typeorm';
import { config } from 'dotenv';
 
config();
 
/*
 * The TypeORM-CLI uses this configuration to manage migrations.
 */
export default new DataSource({
  type: process.env.database_driver as any,
  host: process.env.database_server,
  port: process.env.database_port as any,
  username: process.env.database_username,
  password: process.env.database_password,
  database: process.env.database_name,
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/typeorm/migrations/**/*{.ts,.js}'],
  synchronize: false
});