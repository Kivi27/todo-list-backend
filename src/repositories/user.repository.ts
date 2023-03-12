import { CustomRepository } from '../typeorm-ex/typeorm-ex.decorator';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  public async findAll(): Promise<User[]> {
    return await this.find({
      relations: {
        todoCards: true,
      }
    });
  }
}