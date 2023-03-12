import { BaseService } from '../base.service';
import { UnitOfWorkService } from '../unit-of-work.service';
import { UserResponseDto } from '../../dtos/response/user.response.dto';
import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends BaseService {
  constructor(protected readonly unityOfWork: UnitOfWorkService) {
    super(unityOfWork);
  }

  public async getAll(): Promise<UserResponseDto[]> {

    const users = await this.unityOfWork.userRepository.findAll();
    return users.map((user: User) => User.toDto(user));
  }
}