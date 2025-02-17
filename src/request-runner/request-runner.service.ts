import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { DataSource, QueryRunner } from 'typeorm';
import { RequestStatus } from '../requests/enums/request-status.enum';
import { RequestEntity } from '../requests/entities/request.entity';
import { RequestsService } from '../requests/requests.service';

@Injectable()
export class RequestRunnerService {
  private readonly logger = new Logger(RequestRunnerService.name);

  constructor(
    private readonly requestsService: RequestsService,
    private dataSource: DataSource,
  ) {}

  async requestRunner(): Promise<string> {
    const newRequests = await this.requestsService.findAllNewRequests();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    this.logger.log('START transaction requestRunner');

    try {
      const promises = newRequests.map((request) =>
        this.handleRequest(request, queryRunner),
      );
      await Promise.all(promises);

      await queryRunner.commitTransaction();

      this.logger.log('COMMIT transaction requestRunner');
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.error('ROLLBACK transaction requestRunner', error);
    } finally {
      await queryRunner.release();
    }

    return `Updated ${newRequests.length} records`;
  }

  private async handleRequest(
    request: RequestEntity,
    queryRunner: QueryRunner,
  ): Promise<void> {
    try {
      await this.requestsService.updateTransactional(queryRunner, request.id, {
        status: RequestStatus.PROCESSING,
      });

      const response = await axios.get(request.url);
      const httpCode = response.status;

      await this.requestsService.updateTransactional(queryRunner, request.id, {
        status: RequestStatus.DONE,
        httpCode,
      });
    } catch (error) {
      await this.requestsService.updateTransactional(queryRunner, request.id, {
        status: RequestStatus.ERROR,
        httpCode: error.response ? error.response.status : null,
      });
    }
  }
}
