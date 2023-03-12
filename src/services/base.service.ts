import { UnitOfWorkService } from './unit-of-work.service';

export class BaseService {
  constructor(protected readonly unitOfWork: UnitOfWorkService) {
  }
}