import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCardResponseDto } from '../dtos/response/todo-card.response.dto';
import { TodoCardRequestDto } from '../dtos/request/todo-card.request.dto';

@Entity()
export class TodoCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  public static toDto(todoCard: TodoCard): TodoCardResponseDto {
    return {
      id: todoCard.id,
      title: todoCard.title,
    }
  }

  public static fromDto(todoCardRequest: TodoCardRequestDto): TodoCard {
    const todoCard = new TodoCard();
    todoCard.title = todoCardRequest.title;

    return todoCard;
  }
}