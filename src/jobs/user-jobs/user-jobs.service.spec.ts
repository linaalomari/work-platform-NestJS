import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UserJobsService } from './user-jobs.service';

describe('UserJobsService', () => {
  let service: UserJobsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserJobsService,
        {
          provide: PrismaService,
          useValue: {
            job: {
              findMany: jest.fn().mockResolvedValue([]),
              findUniqueOrThrow: jest.fn().mockResolvedValue({}),
            },
            application: {
              create: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserJobsService>(UserJobsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of jobs with application count', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prisma.job.findMany).toHaveBeenCalledWith({
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single job with application count', async () => {
      const id = 1;
      const result = await service.findOne(id);
      expect(result).toEqual({});
      expect(prisma.job.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id },
        include: {
          _count: {
            select: {
              applications: true,
            },
          },
        },
      });
    });
  });

  describe('submitApplication', () => {
    it('should create a new application', async () => {
      const userId = 1;
      const jobId = 2;
      const submitApplicationDto: SubmitApplicationDto = {
        expectedSalary: 1500,
        noticePeriod: 30,
        yearsOfExperience: 5,
        briefIntro: 'Passionate motivated engineer',
      };
      const result = await service.submitApplication(
        userId,
        jobId,
        submitApplicationDto,
      );
      expect(result).toEqual({});
      expect(prisma.application.create).toHaveBeenCalledWith({
        data: {
          userId,
          jobId,
          ...submitApplicationDto,
        },
      });
    });
  });
});
