import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCard } from './todo-card.entity';
import { TodoCardItemResponseDto } from '../dtos/response/todo-card-item.response.dto';
import { TodoCardItemRequestDto } from '../dtos/request/todo-card-item.request.dto';

@Entity()
export class TodoCardItem {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  description: string;

  @ManyToOne(() => TodoCard, todoCard => todoCard.todoCardItems, {
    onDelete: 'CASCADE',
  })
  todoCard: TodoCard;

  public static toDto(todoCardItem: TodoCardItem): TodoCardItemResponseDto {
    return todoCardItem && {
      id: todoCardItem.id,
      description: todoCardItem.description,
      todoCard: TodoCard.toDto(todoCardItem.todoCard),
    }
  }

  public static fromDto(dto: TodoCardItemRequestDto): TodoCardItem {
    const todoCardItem = new TodoCardItem();
    todoCardItem.description = dto.description;
    todoCardItem.todoCard = {id: dto.todoCardId } as TodoCard;

    return todoCardItem;
  }
}