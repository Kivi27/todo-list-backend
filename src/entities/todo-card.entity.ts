import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCardResponseDto } from '../dtos/response/todo-card.response.dto';
import { TodoCardRequestDto } from '../dtos/request/todo-card.request.dto';
import { TodoCardItem } from './todo-card-item.entity';
import { User } from './user.entity';

@Entity()
export class TodoCard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @OneToMany(() => TodoCardItem, todoCardItem => todoCardItem.todoCard)
  todoCardItems: TodoCardItem[]

  @ManyToOne( () => User, user => user.todoCards, {
    onDelete: 'CASCADE',
  })
  user: User;

  public static toDto(todoCard: TodoCard): TodoCardResponseDto {
    return todoCard && {
      id: todoCard.id,
      title: todoCard.title,
      user: User.toDto(todoCard.user),
      todoCardItems: (todoCard.todoCardItems || []).map((todoCardItem: TodoCardItem) => TodoCardItem.toDto(todoCardItem)),
    }
  }

  public static fromDto(todoCardRequest: TodoCardRequestDto): TodoCard {
    const todoCard = new TodoCard();
    todoCard.title = todoCardRequest.title;
    todoCard.user = {id: todoCardRequest.userId} as User;
    return todoCard;
  }
}