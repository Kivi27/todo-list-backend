import { BaseService } from '../base.service';
import { UnitOfWorkService } from '../unit-of-work.service';
import { UserResponseDto } from '../../dtos/response/user.response.dto';
import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRequestDto } from '../../dtos/request/user.request.dto';

@Injectable()
export class UserService extends BaseService {
  constructor(protected readonly unityOfWork: UnitOfWorkService) {
    super(unityOfWork);
  }

  public async getAll(): Promise<UserResponseDto[]> {
    const users = await this.unityOfWork.userRepository.findAll();
    return users.map((user: User) => User.toDto(user));
  }

  public async create(userRequest: UserRequestDto): Promise<UserResponseDto> {
    const userFromDto = User.fromDto(userRequest);
    const savedUser = await this.unityOfWork.userRepository.save(userFromDto);

    return User.toDto(savedUser);
  }

  public async update(userRequest: UserRequestDto, userId: string): Promise<UserResponseDto> {
    const userFromDto = User.fromDto(userRequest);
    const targetUser: User = await this.unityOfWork.userRepository.findById(userId);

    targetUser.name = userFromDto.name;
    targetUser.lastName = userFromDto.lastName;
    const updatedUser = await this.unityOfWork.userRepository.save(targetUser);

    return User.toDto(updatedUser);
  }

  public async delete(userId: string): Promise<void> {
    const targetUser = await this.unityOfWork.userRepository.findById(userId);
    await this.unityOfWork.userRepository.delete(targetUser);
  }
}