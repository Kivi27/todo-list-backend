import { ApiProperty } from '@nestjs/swagger';

export class TodoCardRequestDto {
  @ApiProperty()
  public title: string;
}