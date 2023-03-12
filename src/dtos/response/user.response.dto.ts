import { ApiProperty } from '@nestjs/swagger';
import { TodoCardResponseDto } from './todo-card.response.dto';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  todoCards: TodoCardResponseDto[]
}