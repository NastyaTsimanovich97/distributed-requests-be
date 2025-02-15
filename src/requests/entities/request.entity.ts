import { Column, Entity, Unique } from 'typeorm';

import { AbstractEntity } from '../../common/entities/abstract.entity';
import { RequestStatus } from '../../requests/enums/RequestStatus.enum';

@Entity({ name: 'request' })
@Unique(['url'])
export class RequestEntity extends AbstractEntity {
  @Column()
  url: string;

  @Column({ enum: RequestStatus, default: RequestStatus.NEW })
  status: RequestStatus;

  @Column({ nullable: true, name: 'http_code' })
  httpCode: number | null;
}
