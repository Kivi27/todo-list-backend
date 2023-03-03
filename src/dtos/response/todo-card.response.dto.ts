import { TodoCardItemResponseDto } from './todo-card-item.response.dto';

export class TodoCardResponseDto {
  public id: string;
  public title: string;
  public todoCardItems: TodoCardItemResponseDto[];
}