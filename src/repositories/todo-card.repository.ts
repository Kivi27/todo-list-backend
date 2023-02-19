import { TodoCard } from '../entities/todo-card.entity';
import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';
import { Repository } from 'typeorm';

@CustomRepository(TodoCard)
export class TodoCardRepository extends Repository<TodoCard> {

}