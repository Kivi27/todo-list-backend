import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoCardRequestDto } from '../../dtos/request/todo-card.request.dto';
import { TodoCardService } from '../../services/todo-card/todo-card.service.';
import { TodoCardResponseDto } from '../../dtos/response/todo-card.response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('todo cards')
@Controller('todo-cards')
export class TodoCardController {

  constructor(private readonly todoCardService: TodoCardService) {
  }

  @Get()
  public async findAll(): Promise<TodoCardResponseDto[]> {
    return await this.todoCardService.getAll();
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<TodoCardResponseDto> {
    return await this.todoCardService.findById(id);
  }

  @Post()
  public async create(@Body() todoCardRequest: TodoCardRequestDto): Promise<TodoCardResponseDto> {
    return await this.todoCardService.createNewTodoCard(todoCardRequest);
  }

  @Put(':id')
  public async updateBuId(
      @Param('id') id:string,
      @Body() todoCardRequest: TodoCardRequestDto
    ): Promise<TodoCardResponseDto> {
    return await this.todoCardService.updateById(id, todoCardRequest);
  }

  @Delete(':id')
  public async deleteById(@Param('id') id:string): Promise<void> {
    return await this.todoCardService.deleteById(id);
  }
}