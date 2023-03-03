import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCardResponseDto } from '../dtos/response/todo-card.response.dto';
import { TodoCardRequestDto } from '../dtos/request/todo-card.request.dto';
import { TodoCardItem } from './todo-card-item.entity';

@Entity()
export class TodoCard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @OneToMany(() => TodoCardItem, todoCardItem => todoCardItem.todoCard)
  todoCardItems: TodoCardItem[]

  public static toDto(todoCard: TodoCard): TodoCardResponseDto {
    return todoCard && {
      id: todoCard.id,
      title: todoCard.title,
      todoCardItems: (todoCard.todoCardItems || []).map((todoCardItem: TodoCardItem) => TodoCardItem.toDto(todoCardItem)),
    }
  }

  public static fromDto(todoCardRequest: TodoCardRequestDto): TodoCard {
    const todoCard = new TodoCard();
    todoCard.title = todoCardRequest.title;
    return todoCard;
  }
}