import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCardItemRepository } from '../../repositories/todo-card-item.repository';
import { TodoCardItem } from '../../entities/todo-card-item.entity';
import { TodoCardItemResponseDto } from '../../dtos/response/todo-card-item.response.dto';

@Injectable()
export class TodoCardItemService {
  constructor(@InjectRepository(TodoCardItemRepository) private todoCardItemRepository: TodoCardItemRepository) {

  }

  public async findAll(): Promise<TodoCardItemResponseDto[]> {
    const todoCardItems: TodoCardItem[] = await this.todoCardItemRepository.findAll();

    return todoCardItems.map((todoCardItem: TodoCardItem) => TodoCardItem.toDto(todoCardItem));
  }
}