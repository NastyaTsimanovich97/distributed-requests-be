import { Module } from '@nestjs/common';
import { RequestRunnerService } from './request-runner.service';
import { RequestRunnerController } from './request-runner.controller';
import { RequestsModule } from '../requests/requests.module';

@Module({
  imports: [RequestsModule],
  controllers: [RequestRunnerController],
  providers: [RequestRunnerService],
})
export class RequestRunnerModule {}
