import { Test, TestingModule } from '@nestjs/testing';
import { JobType } from '@prisma/client';
import { AdminJobsController } from './admin-jobs.controller';
import { AdminJobsService } from './admin-jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-admin-job.dto';

describe('AdminJobsController', () => {
  let controller: AdminJobsController;
  let service: AdminJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminJobsController],
      providers: [
        {
          provide: AdminJobsService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<AdminJobsController>(AdminJobsController);
    service = module.get<AdminJobsService>(AdminJobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a job', async () => {
      const createJobDto: CreateJobDto = {
        title: 'Full Stack developer',
        companyName: 'nxgen',
        description: "Full time job where you'll learn a lot",
        type: JobType.HYBRID,
        companyLocation: 'Abdoun',
      };
      await controller.create(createJobDto);
      expect(service.create).toHaveBeenCalledWith(createJobDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single job', async () => {
      const id = 1;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      const id = '1';
      const updateJobDto: UpdateJobDto = {
        type: JobType.ONSITE,
      };
      await controller.update(id, updateJobDto);
      expect(service.update).toHaveBeenCalledWith(+id, updateJobDto);
    });
  });

  describe('remove', () => {
    it('should remove a job', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
