import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TypeOrmExModule } from './typeorm-ex/typeorm-ex.module';
import { TodoCardRepository } from './repositories/todo-card.repository';
import { TodoCardController } from './controllers/todo-card/todo-card.controller';
import { TodoCardService } from './services/todo-card/todo-card.service.';
import { TodoCardItemController } from './controllers/todo-card-item/todo-card-item.controller';
import { TodoCardItemService } from './services/todo-card-item/todo-card-item.service';
import { TodoCardItemRepository } from './repositories/todo-card-item.repository';
import { BaseService } from './services/base.service';
import { UnitOfWorkService } from './services/unit-of-work.service';

const repositories = [
  TodoCardRepository,
  TodoCardItemRepository,
]

const controllers = [
  AppController,
  TodoCardController,
  TodoCardItemController,
]

const providers = [
  AppService,
  TodoCardService,
  TodoCardItemService,
  BaseService,
  UnitOfWorkService,
]

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TypeOrmExModule.forCustomRepository([...repositories]),
  ],
  controllers: [...controllers],
  providers: [...providers],
})
export class AppModule {}
