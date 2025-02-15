import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestEntity } from './entities/request.entity';

import {
  DUPLICATE_REQUEST,
  NOT_FOUND_REQUEST,
} from '../common/constants/errors';

@Controller('requests')
@ApiTags('Requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiBadRequestResponse({ description: DUPLICATE_REQUEST })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: RequestEntity,
  })
  async create(
    @Body() createRequestDto: CreateRequestDto,
  ): Promise<RequestEntity> {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  @ApiResponse({
    description: 'All records in the system.',
    type: RequestEntity,
    isArray: true,
  })
  async findAll(): Promise<RequestEntity[]> {
    return this.requestsService.findAll();
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: NOT_FOUND_REQUEST })
  @ApiResponse({
    description: 'The record has been successfully removed.',
    type: String,
  })
  async remove(@Param('id') id: string) {
    return this.requestsService.remove(id);
  }
}
