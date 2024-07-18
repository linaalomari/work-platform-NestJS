import { Test, TestingModule } from '@nestjs/testing';
import { UserJobsController } from './user-jobs.controller';
import { UserJobsService } from './user-jobs.service';

describe('UserJobsController', () => {
  let controller: UserJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserJobsController],
      providers: [UserJobsService],
    }).compile();

    controller = module.get<UserJobsController>(UserJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
