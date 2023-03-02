import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCardRepository } from '../../repositories/todo-card.repository';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';
import { TodoCardResponseDto } from '../../dtos/response/todo-card.response.dto';
import { TodoCard } from '../../entities/todo-card.entity';

@Injectable()
export class TodoCardService {
  constructor(@InjectRepository(TodoCardRepository) private todoCardRepository: TodoCardRepository) {
  }

  public async getAll(): Promise<TodoCardResponseDto[]> {
    const todoCards: TodoCard[] = await this.todoCardRepository.findAll();

    return todoCards.map((todoCard: TodoCard) => TodoCard.toDto(todoCard));
  }
  public async createNewTodoCard(todoCardRequest: TodoCardRequestDto) {
    const todoCardFromTdo: TodoCard = TodoCard.fromDto(todoCardRequest);
    const todoCard: TodoCard = await this.todoCardRepository.save(todoCardFromTdo);

    return TodoCard.toDto(todoCard);
  }
}