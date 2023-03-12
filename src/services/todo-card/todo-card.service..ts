import { Injectable } from '@nestjs/common';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';
import { TodoCardResponseDto } from '../../dtos/response/todo-card.response.dto';
import { TodoCard } from '../../entities/todo-card.entity';
import { BaseService } from '../base.service';
import { UnitOfWorkService } from '../unit-of-work.service';

@Injectable()
export class TodoCardService extends BaseService {
  constructor(protected readonly unitOfWork: UnitOfWorkService) {
    super(unitOfWork);
  }

  public async getAll(): Promise<TodoCardResponseDto[]> {
    const todoCards: TodoCard[] = await this.unitOfWork.todoCardRepository.findAll();

    return todoCards.map((todoCard: TodoCard) => TodoCard.toDto(todoCard));
  }

  public async findById(id: string): Promise<TodoCardResponseDto> {
    const todoCard: TodoCard = await this.unitOfWork.todoCardRepository.findById(id);
    return TodoCard.toDto(todoCard);
  }

  public async createNewTodoCard(todoCardRequest: TodoCardRequestDto): Promise<TodoCardResponseDto> {
    const todoCardFromTdo: TodoCard = TodoCard.fromDto(todoCardRequest);
    const todoCard: TodoCard = await this.unitOfWork.todoCardRepository.save(todoCardFromTdo);

    return TodoCard.toDto(todoCard);
  }

  public async updateById(todoCardId: string, todoCardRequest: TodoCardRequestDto): Promise<TodoCardResponseDto> {
    const todoCardFromDto: TodoCard = TodoCard.fromDto(todoCardRequest);
    const targetTodoCard: TodoCard = await this.unitOfWork.todoCardRepository.findById(todoCardId);

    targetTodoCard.title = todoCardFromDto.title;

    return await this.unitOfWork.todoCardRepository.save(targetTodoCard);
  }

  public async deleteById(todoId: string): Promise<void> {
    const targetTodoCard = await this.unitOfWork.todoCardRepository.findById(todoId);
    await this.unitOfWork.todoCardRepository.delete(targetTodoCard);
  }
}