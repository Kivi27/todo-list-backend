import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCardRepository } from '../../repositories/todo-card.repository';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';
import { TodoCardResponseDto } from '../../dtos/response/todo-card.response.dto';

@Injectable()
export class TodoCardService {
  constructor(@InjectRepository(TodoCardRepository) private todoCardRepository: TodoCardRepository) {
  }

  public async getAll(): Promise<TodoCardResponseDto[]> {
    return await this.todoCardRepository.find();
  }
  public async createNewTodoCard(todoCardRequest: TodoCardRequestDto) {
    return await this.todoCardRepository.save(todoCardRequest);
  }
}