import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCard } from './todo-card.entity';

@Entity()
export class TodoCardItem {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  description: string;

  @ManyToOne(() => TodoCard, todoCard => todoCard.todoCardItems)
  todoCard: TodoCard;
}