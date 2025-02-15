import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  DUPLICATE_REQUEST,
  NOT_FOUND_REQUEST,
} from '../common/constants/errors';

import { isDuplicateError } from '../utils/isDuplicateError.util';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestEntity } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private requestRepository: Repository<RequestEntity>,
  ) {}

  async create(createRequestDto: CreateRequestDto): Promise<RequestEntity> {
    try {
      return await this.requestRepository.save(createRequestDto);
    } catch (error) {
      const isDuplicate = isDuplicateError(error.message);

      if (isDuplicate) {
        throw new BadRequestException(DUPLICATE_REQUEST);
      }

      throw Error(error);
    }
  }

  async findAll(): Promise<RequestEntity[]> {
    return this.requestRepository.find({ order: { createdAt: 'ASC' } });
  }

  async remove(id: string): Promise<string> {
    const { affected } = await this.requestRepository.delete(id);

    if (!affected) {
      throw new NotFoundException(NOT_FOUND_REQUEST);
    }

    return 'Record is deleted';
  }
}
