import { Test, TestingModule } from '@nestjs/testing';
import { JobType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminJobsService } from './admin-jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-admin-job.dto';

describe('AdminJobsService', () => {
  let service: AdminJobsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminJobsService,
        {
          provide: PrismaService,
          useValue: {
            job: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUniqueOrThrow: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AdminJobsService>(AdminJobsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      await service.create(createJobDto);
      expect(prisma.job.create).toHaveBeenCalledWith({
        data: createJobDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      await service.findAll();
      expect(prisma.job.findMany).toHaveBeenCalledWith({
        include: { _count: { select: { applications: true } } },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single job', async () => {
      const id = 1;
      await service.findOne(id);
      expect(prisma.job.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: {
          applications: {
            include: {
              user: true,
            },
          },
        },
      });
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      const id = 1;
      const updateJobDto: UpdateJobDto = {
        /* add necessary properties */
      };
      await service.update(id, updateJobDto);
      expect(prisma.job.update).toHaveBeenCalledWith({
        where: { id },
        data: updateJobDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a job', async () => {
      const id = 1;
      await service.remove(id);
      expect(prisma.job.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
