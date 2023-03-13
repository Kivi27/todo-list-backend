import { TodoCardResponseDto } from './todo-card.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TodoCardItemResponseDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public status: boolean;
  @ApiProperty()
  public todoCard: TodoCardResponseDto;
}