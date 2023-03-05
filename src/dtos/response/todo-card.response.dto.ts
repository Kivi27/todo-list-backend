import { TodoCardItemResponseDto } from './todo-card-item.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TodoCardResponseDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public title: string;
  @ApiProperty({type: [TodoCardItemResponseDto]})
  public todoCardItems: TodoCardItemResponseDto[];
}