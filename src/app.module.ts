import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './common/config/configuration';
import { typeOrmAsyncConfig } from './common/config/type-orm-async-config';

import { RequestsModule } from './requests/requests.module';
import { RequestRunnerModule } from './request-runner/request-runner.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    RequestsModule,
    RequestRunnerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
