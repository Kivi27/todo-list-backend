import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { TodoCardItem } from '../entities/todo-card-item.entity';

@CustomRepository(TodoCardItem)
export class TodoCardItemRepository extends Repository<TodoCardItem> {

}