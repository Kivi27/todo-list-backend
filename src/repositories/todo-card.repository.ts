import { TodoCard } from '../entities/todo-card.entity';
import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { TodoCardResponseDto } from '../dtos/response/todo-card.response.dto';

@CustomRepository(TodoCard)
export class TodoCardRepository extends Repository<TodoCard> {
  public async findAll(): Promise<TodoCardResponseDto[]> {
    const todoCards = await this.find();

    return  todoCards.map(todoCard => TodoCard.toDto(todoCard));
  }
}