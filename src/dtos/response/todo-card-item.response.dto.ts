import { TodoCardResponseDto } from './todo-card.response.dto';

export class TodoCardItemResponseDto {
  public id: string;
  public description: string;
  public todoCard: TodoCardResponseDto;
}