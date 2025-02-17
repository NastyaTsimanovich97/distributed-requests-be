import { ApiProperty } from '@nestjs/swagger';

import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractIdEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;
}

export abstract class AbstractEntity extends AbstractIdEntity {
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date | number;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date | number;
}
