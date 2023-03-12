import { Controller, Get } from '@nestjs/common';
import { UserResponseDto } from '../../dtos/response/user.response.dto';
import { UserService } from '../../services/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  public async getAll(): Promise<UserResponseDto[]> {
    return this.userService.getAll();
  }
}