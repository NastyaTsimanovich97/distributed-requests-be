import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractIdEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
}

export abstract class AbstractEntity extends AbstractIdEntity {
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt?: Date | number;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt?: Date | number;
}
