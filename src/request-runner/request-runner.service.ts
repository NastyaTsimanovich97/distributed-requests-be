import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RequestStatus } from '../requests/enums/request-status.enum';
import { RequestEntity } from '../requests/entities/request.entity';
import { RequestsService } from '../requests/requests.service';

@Injectable()
export class RequestRunnerService {
  constructor(private readonly requestsService: RequestsService) {}

  async requestRunner(): Promise<string> {
    const newRequests = await this.requestsService.findAllNewRequests();

    const promises = newRequests.map((request) => this.handleRequest(request));
    await Promise.all(promises);

    return `Updated ${newRequests.length} records`;
  }

  private async handleRequest(request: RequestEntity): Promise<void> {
    try {
      await this.requestsService.update(request.id, {
        status: RequestStatus.PROCESSING,
      });

      const response = await axios.get(request.url);
      const httpCode = response.status;

      await this.requestsService.update(request.id, {
        status: RequestStatus.DONE,
        httpCode,
      });
    } catch (error) {
      await this.requestsService.update(request.id, {
        status: RequestStatus.ERROR,
        httpCode: error.response ? error.response.status : null,
      });
    }
  }
}
