import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';
import { TodoCardService } from '../../services/todo-card/todo-card.service.';

@Controller('todo-cards')
export class TodoCardController {

  constructor(private readonly todoCardService: TodoCardService) {
  }

  @Get()
  public findAll(): string {
    return "it is test";
  }

  @Post()
  public async create(@Body() todoCardRequest: TodoCardRequestDto) {
    await this.todoCardService.createNewTodoCard(todoCardRequest);
  }
}