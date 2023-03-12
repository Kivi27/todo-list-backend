import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCard } from './todo-card.entity';
import { UserResponseDto } from '../dtos/response/user.response.dto';
import { UserRequestDto } from '../dtos/request/user.request.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @OneToMany(() => TodoCard, TodoCard => TodoCard.user)
  todoCards: TodoCard[];

  public static toDto(user: User): UserResponseDto {
    return user && {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      todoCards: (user.todoCards || []).map((todoCard: TodoCard) => TodoCard.toDto(todoCard)),
    }
  }

  public static fromDto(userRequest: UserRequestDto): User {
    const user = new User();
    user.name = userRequest.name;
    user.lastName = userRequest.lastName;

    return user;
  }
}