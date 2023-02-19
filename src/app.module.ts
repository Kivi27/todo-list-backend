import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TypeOrmExModule } from './typeorm-ex/typeorm-ex.module';
import { TodoCardRepository } from './repositories/todo-card.repository';
import { TodoCardController } from './controlles/todo-card/todo-card.controller';
import { TodoCardService } from './services/todo-card/todo-card.service.';

const repositories = [
  TodoCardRepository,
]

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
  controllers: [AppController, TodoCardController],
  providers: [AppService, TodoCardService],
})
export class AppModule {}
