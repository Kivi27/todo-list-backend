import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}