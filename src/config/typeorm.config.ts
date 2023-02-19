import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig:TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'todo-list',
  entities: [`${__dirname}/../entities/*.entity{.ts,.js}`],
  synchronize: true,
}