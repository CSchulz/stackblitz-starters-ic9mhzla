import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { CorrelationIdModule } from './correlation-id/correlation-id.module';
import { EnvVariablesModule } from './configuration/env-variables.module';
import { EnvVariablesService } from './configuration/env-variables.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthzModule } from './healthz/healthz.module';
import { BookEntity } from './books/entities/book.entity';

@Module({
  imports: [BooksModule, CorrelationIdModule, EnvVariablesModule,
    HealthzModule,
    TypeOrmModule.forRootAsync({
      useFactory: (envVariables: EnvVariablesService) => ({
        type: envVariables.get('database_driver') as any,
        host: envVariables.get('database_server'),
        port: envVariables.get('database_port'),
        username: envVariables.get('database_username'),
        password: envVariables.get('database_password'),
        database: envVariables.get('database_name'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [EnvVariablesService],
    }),
    HealthzModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
