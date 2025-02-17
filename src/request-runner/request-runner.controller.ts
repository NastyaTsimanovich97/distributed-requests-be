import { Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { RequestRunnerService } from './request-runner.service';

@Controller('request-runner')
export class RequestRunnerController {
  constructor(private readonly requestRunnerService: RequestRunnerService) {}

  @Post()
  @ApiResponse({
    description: 'Updated New requests',
    type: String,
  })
  async run(): Promise<string> {
    return this.requestRunnerService.requestRunner();
  }
}
