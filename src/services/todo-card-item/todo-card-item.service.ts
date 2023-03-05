import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCardItemRepository } from '../../repositories/todo-card-item.repository';
import { TodoCardItem } from '../../entities/todo-card-item.entity';
import { TodoCardItemResponseDto } from '../../dtos/response/todo-card-item.response.dto';
import { TodoCardItemRequestDto } from '../../dtos/request/todo-card-item.request.dto';

@Injectable()
export class TodoCardItemService {
  constructor(@InjectRepository(TodoCardItemRepository) private todoCardItemRepository: TodoCardItemRepository) {

  }

  public async findAll(): Promise<TodoCardItemResponseDto[]> {
    const todoCardItems: TodoCardItem[] = await this.todoCardItemRepository.findAll();

    return todoCardItems.map((todoCardItem: TodoCardItem) => TodoCardItem.toDto(todoCardItem));
  }

  public async findById(todoCardItemId: string): Promise<TodoCardItemResponseDto> {
    const cardItem = await this.todoCardItemRepository.findById(todoCardItemId);

    return TodoCardItem.toDto(cardItem);
  }

  public async updateById(
    todoCardItemId: string,
    updatedTodoCardItemRequest: TodoCardItemRequestDto
  ): Promise<TodoCardItemResponseDto> {
    const targetTodoCardItem: TodoCardItem = await this.todoCardItemRepository.findById(todoCardItemId);
    const todoCardItemFromDto: TodoCardItem = TodoCardItem.fromDto(updatedTodoCardItemRequest);

    targetTodoCardItem.description = todoCardItemFromDto.description;
    targetTodoCardItem.todoCard = todoCardItemFromDto.todoCard;

    const updatedTodoCardItem = await this.todoCardItemRepository.save(targetTodoCardItem);

    return TodoCardItem.toDto(updatedTodoCardItem);
  }

  public async deleteById(todoCardItemId: string): Promise<void> {
    const deleteTodoCardItem: TodoCardItem = await this.todoCardItemRepository.findById(todoCardItemId);
    await this.todoCardItemRepository.delete(deleteTodoCardItem);
  }

  public async create(todoCardItemRequest: TodoCardItemRequestDto): Promise<TodoCardItemResponseDto> {
    const todoCardItemFromDto: TodoCardItem = TodoCardItem.fromDto(todoCardItemRequest);
    const savedTodoCardItem = await this.todoCardItemRepository.save(todoCardItemFromDto);

    return TodoCardItem.toDto(savedTodoCardItem);
  }
}