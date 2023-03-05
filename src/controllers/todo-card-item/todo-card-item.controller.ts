import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoCardItemResponseDto } from '../../dtos/response/todo-card-item.response.dto';
import { TodoCardItemService } from '../../services/todo-card-item/todo-card-item.service';
import { ApiTags } from '@nestjs/swagger';
import { TodoCardItemRequestDto } from '../../dtos/request/todo-card-item.request.dto';

@ApiTags('todo card items')
@Controller('todo-card-items')
export class TodoCardItemController {

  constructor(private todoCardItemService: TodoCardItemService) {
  }

  @Get()
  public async getAll(): Promise<TodoCardItemResponseDto[]> {
    return await this.todoCardItemService.findAll();
  }

  @Get(':id')
  public async getById(@Param('id') id: string): Promise<TodoCardItemResponseDto> {
    return await this.todoCardItemService.findById(id);
  }

  @Post()
  public async create(@Body() todoCardItemRequest: TodoCardItemRequestDto) {
    return await this.todoCardItemService.create(todoCardItemRequest);
  }

  @Put(':id')
  public async updateById(
    @Param('id') id: string,
    @Body() updatedTodoCardItem: TodoCardItemRequestDto
  ): Promise<TodoCardItemResponseDto> {
    return await this.todoCardItemService.updateById(id, updatedTodoCardItem);
  }

  @Delete(':id')
  public async deleteById(@Param('id') id: string): Promise<void> {
    return await this.todoCardItemService.deleteById(id);
  }
}