import { Test, TestingModule } from '@nestjs/testing';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UserJobsController } from './user-jobs.controller';
import { UserJobsService } from './user-jobs.service';

describe('UserJobsController', () => {
  let controller: UserJobsController;
  let service: UserJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserJobsController],
      providers: [
        {
          provide: UserJobsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            submitApplication: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UserJobsController>(UserJobsController);
    service = module.get<UserJobsService>(UserJobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single job', async () => {
      const id = 1;
      const result = await controller.findOne(id);
      expect(result).toEqual({});
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('submitJobApplication', () => {
    it('should submit a job application', async () => {
      const id = 1;
      const submitApplicationDto: SubmitApplicationDto = {
        expectedSalary: 1500,
        noticePeriod: 30,
        yearsOfExperience: 5,
        briefIntro: 'Passionate motivated engineer',
      };
      const result = await controller.submitJobApplication(
        id,
        submitApplicationDto,
      );
      expect(result).toEqual({});
      expect(service.submitApplication).toHaveBeenCalledWith(
        1,
        id,
        submitApplicationDto,
      );
    });
  });
});
