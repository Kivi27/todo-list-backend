import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCardRepository } from '../../repositories/todo-card.repository';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';

@Injectable()
export class TodoCardService {
  constructor(@InjectRepository(TodoCardRepository) private todoCardRepository: TodoCardRepository) {
  }

  async createNewTodoCard(todoCardRequest: TodoCardRequestDto) {
    return await this.todoCardRepository.save(todoCardRequest);
  }
}