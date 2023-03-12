import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserResponseDto } from '../../dtos/response/user.response.dto';
import { UserService } from '../../services/user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../../dtos/request/user.request.dto';

@ApiTags('Users')
@Controller('api/users')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  public async getAll(): Promise<UserResponseDto[]> {
    return this.userService.getAll();
  }

  @Post()
  public async create(@Body() userRequest: UserRequestDto): Promise<UserResponseDto> {
    return this.userService.create(userRequest);
  }

  @Put()
  public async update(
    @Body() userRequest: UserRequestDto,
    @Param('id') userId: string,
  ): Promise<UserResponseDto> {
    return this.userService.update(userRequest, userId);
  }

  @Delete()
  public async delete(@Param('id') userId: string): Promise<void> {
    return await this.userService.delete(userId);
  }
}