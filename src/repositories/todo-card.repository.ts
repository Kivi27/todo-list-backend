import { TodoCard } from '../entities/todo-card.entity';
import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(TodoCard)
export class TodoCardRepository extends Repository<TodoCard> {
  public async findAll(): Promise<TodoCard[]> {
    return await this.find();
  }

  public async findById(todoCardId: string): Promise<TodoCard> {
    return await this.findOne({
      where: {
        id: todoCardId,
      },
    });
  }
}