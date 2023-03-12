import { Injectable } from '@nestjs/common';
import { TodoCardItem } from '../../entities/todo-card-item.entity';
import { TodoCardItemResponseDto } from '../../dtos/response/todo-card-item.response.dto';
import { TodoCardItemRequestDto } from '../../dtos/request/todo-card-item.request.dto';
import { BaseService } from '../base.service';
import { UnitOfWorkService } from '../unit-of-work.service';

@Injectable()
export class TodoCardItemService extends BaseService{
  constructor(protected readonly unitOfWork: UnitOfWorkService) {
    super(unitOfWork);
  }

  public async findAll(): Promise<TodoCardItemResponseDto[]> {
    const todoCardItems: TodoCardItem[] = await this.unitOfWork.todoCardItemRepository.findAll();

    return todoCardItems.map((todoCardItem: TodoCardItem) => TodoCardItem.toDto(todoCardItem));
  }

  public async findById(todoCardItemId: string): Promise<TodoCardItemResponseDto> {
    const cardItem = await this.unitOfWork.todoCardItemRepository.findById(todoCardItemId);

    return TodoCardItem.toDto(cardItem);
  }

  public async updateById(
    todoCardItemId: string,
    updatedTodoCardItemRequest: TodoCardItemRequestDto
  ): Promise<TodoCardItemResponseDto> {
    const targetTodoCardItem: TodoCardItem = await this.unitOfWork.todoCardItemRepository.findById(todoCardItemId);
    const todoCardItemFromDto: TodoCardItem = TodoCardItem.fromDto(updatedTodoCardItemRequest);

    targetTodoCardItem.description = todoCardItemFromDto.description;
    targetTodoCardItem.todoCard = todoCardItemFromDto.todoCard;

    const updatedTodoCardItem = await this.unitOfWork.todoCardItemRepository.save(targetTodoCardItem);

    return TodoCardItem.toDto(updatedTodoCardItem);
  }

  public async deleteById(todoCardItemId: string): Promise<void> {
    const deleteTodoCardItem: TodoCardItem = await this.unitOfWork.todoCardItemRepository.findById(todoCardItemId);
    await this.unitOfWork.todoCardItemRepository.delete(deleteTodoCardItem);
  }

  public async create(todoCardItemRequest: TodoCardItemRequestDto): Promise<TodoCardItemResponseDto> {
    const todoCardItemFromDto: TodoCardItem = TodoCardItem.fromDto(todoCardItemRequest);
    const savedTodoCardItem = await this.unitOfWork.todoCardItemRepository.save(todoCardItemFromDto);

    return TodoCardItem.toDto(savedTodoCardItem);
  }
}