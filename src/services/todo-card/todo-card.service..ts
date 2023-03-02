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

  public async findById(id: string): Promise<TodoCardResponseDto> {
    const todoCard: TodoCard = await this.todoCardRepository.findById(id);
    return TodoCard.toDto(todoCard);
  }

  public async createNewTodoCard(todoCardRequest: TodoCardRequestDto): Promise<TodoCardResponseDto> {
    const todoCardFromTdo: TodoCard = TodoCard.fromDto(todoCardRequest);
    const todoCard: TodoCard = await this.todoCardRepository.save(todoCardFromTdo);

    return TodoCard.toDto(todoCard);
  }

  public async updateById(todoCardId: string, todoCardRequest: TodoCardRequestDto): Promise<TodoCardResponseDto> {
    const todoCardFromDto: TodoCard = TodoCard.fromDto(todoCardRequest);
    const targetTodoCard: TodoCard = await this.todoCardRepository.findById(todoCardId);

    targetTodoCard.title = todoCardFromDto.title;

    return await this.todoCardRepository.save(targetTodoCard);
  }

  public async deleteById(todoId: string): Promise<void> {
    const targetTodoCard = await this.todoCardRepository.findById(todoId);
    await this.todoCardRepository.delete(targetTodoCard);
  }
}