import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryController } from './users-repository.controller';
import { UsersRepositoryService } from './users-repository.service';

describe('UsersRepositoryController', () => {
  let controller: UsersRepositoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersRepositoryController],
      providers: [UsersRepositoryService],
    }).compile();

    controller = module.get<UsersRepositoryController>(UsersRepositoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
