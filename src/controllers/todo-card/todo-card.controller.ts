import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';
import { TodoCardService } from '../../services/todo-card/todo-card.service.';
import { TodoCardResponseDto } from '../../dtos/response/todo-card.response.dto';

@Controller('todo-cards')
export class TodoCardController {

  constructor(private readonly todoCardService: TodoCardService) {
  }

  @Get()
  public async findAll(): Promise<TodoCardResponseDto[]> {
    return await this.todoCardService.getAll();
  }

  @Post()
  public async create(@Body() todoCardRequest: TodoCardRequestDto) {
    await this.todoCardService.createNewTodoCard(todoCardRequest);
  }
}