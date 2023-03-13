import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCard } from './todo-card.entity';
import { TodoCardItemResponseDto } from '../dtos/response/todo-card-item.response.dto';
import { TodoCardItemRequestDto } from '../dtos/request/todo-card-item.request.dto';

@Entity()
export class TodoCardItem {
  @PrimaryGeneratedColumn("uuid")
  public id: string

  @Column()
  public description: string;

  @Column({
    default: false,
  })
  public status: boolean;

  @ManyToOne(() => TodoCard, todoCard => todoCard.todoCardItems, {
    onDelete: 'CASCADE',
  })
  public todoCard: TodoCard;

  public static toDto(todoCardItem: TodoCardItem): TodoCardItemResponseDto {
    return todoCardItem && {
      id: todoCardItem.id,
      description: todoCardItem.description,
      status: todoCardItem.status,
      todoCard: TodoCard.toDto(todoCardItem.todoCard),
    }
  }

  public static fromDto(dto: TodoCardItemRequestDto): TodoCardItem {
    const todoCardItem = new TodoCardItem();
    todoCardItem.description = dto.description;
    todoCardItem.status = dto.status;
    todoCardItem.todoCard = {id: dto.todoCardId } as TodoCard;

    return todoCardItem;
  }
}