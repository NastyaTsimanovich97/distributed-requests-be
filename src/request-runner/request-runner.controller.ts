import { Controller, Post } from '@nestjs/common';
import { RequestRunnerService } from './request-runner.service';

@Controller('request-runner')
export class RequestRunnerController {
  constructor(private readonly requestRunnerService: RequestRunnerService) {}

  @Post()
  async run(): Promise<string> {
    return this.requestRunnerService.requestRunner();
  }
}
