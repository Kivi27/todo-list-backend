import { Controller, Get } from '@nestjs/common';
import { TodoCardItemResponseDto } from '../../dtos/response/todo-card-item.response.dto';
import { TodoCardItemService } from '../../services/todo-card-item/todo-card-item.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todo card items')
@Controller('todo-card-items')
export class TodoCardItemController {

  constructor(private todoCardItemService: TodoCardItemService) {
  }

  @Get()
  public async getAll(): Promise<TodoCardItemResponseDto[]> {
    return await this.todoCardItemService.findAll();
  }
}