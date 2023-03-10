import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { TodoCardItem } from '../entities/todo-card-item.entity';

@CustomRepository(TodoCardItem)
export class TodoCardItemRepository extends Repository<TodoCardItem> {
  public async findAll(): Promise<TodoCardItem[]> {
    return await this.find({
      relations: {
        todoCard: true,
      },
    });
  }

  public  async findById(todoCardItemId: string): Promise<TodoCardItem> {
    return await this.findOne({
      relations: {
        todoCard: true,
      },
      where: {
        id: todoCardItemId,
      },
    });
  }
}