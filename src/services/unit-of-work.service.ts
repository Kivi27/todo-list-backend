import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCardRepository } from '../repositories/todo-card.repository';
import { TodoCardItemRepository } from '../repositories/todo-card-item.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UnitOfWorkService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TodoCardRepository) public readonly todoCardRepository: TodoCardRepository,
    @InjectRepository(TodoCardItemRepository) public readonly todoCardItemRepository: TodoCardItemRepository,
  ) {}

  public async doWork<T>(work: () => T): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await work();
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      Logger.error(error);
      throw  error;
    } finally {
      await queryRunner.release();
    }
  }
}