import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Unique } from 'typeorm';

import { AbstractEntity } from '../../common/entities/abstract.entity';
import { RequestStatus } from '../enums/request-status.enum';

@Entity({ name: 'request' })
@Unique(['url'])
export class RequestEntity extends AbstractEntity {
  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.NEW })
  status: RequestStatus;

  @ApiProperty()
  @Column({ nullable: true, name: 'http_code' })
  httpCode: number | null;
}
