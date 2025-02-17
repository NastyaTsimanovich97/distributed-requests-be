import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
