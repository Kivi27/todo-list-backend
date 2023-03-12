import { TodoCardItemResponseDto } from './todo-card-item.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class TodoCardResponseDto {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public user: UserResponseDto;

  @ApiProperty({type: [TodoCardItemResponseDto]})
  public todoCardItems: TodoCardItemResponseDto[];
}