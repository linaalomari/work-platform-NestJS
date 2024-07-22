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
    it('should return an array of jobs with application count and user application', async () => {
      const userId = 7;
      const result = await service.findAll(userId);
      expect(result).toEqual([
        {
          id: 2,
          title: 'Senior Backend Developer',
          description:
            'We are seeking a skilled Backend Developer to join our talented development team. The ideal candidate will be responsible for designing, implementing, and maintaining server-side logic, ensuring high performance and responsiveness to requests from the front-end. You will work closely with front-end developers, product managers, and other stakeholders to deliver high-quality, scalable solutions',
          companyName: 'NXGEN',
          companyLocation: 'Abdoun',
          type: 'HYBRID',
          createdAt: '2024-07-18T20:47:00.380Z',
          updatedAt: '2024-07-18T20:47:00.380Z',
          applications: [
            {
              id: 5,
              userId: 7,
              jobId: 2,
              yearsOfExperience: 3,
              noticePeriod: 30,
              expectedSalary: 1500,
              briefIntro:
                'Having worked extensively with [relevant programming languages/technologies], I have developed and maintained robust applications and services that meet the highest performance standards. My experience in database management, API development, and collaboration with front-end teams has equipped me with a well-rounded skill set that aligns perfectly with the requirements of this role',
              status: 'PENDING',
              createdAt: '2024-07-19T11:10:32.665Z',
              updatedAt: '2024-07-19T11:10:32.665Z',
            },
          ],
          _count: {
            applications: 2,
          },
        },
        {
          id: 4,
          title: 'Senior FullStack Developer',
          description:
            'We are seeking a skilled Backend Developer to join our talented development team. The ideal candidate will be responsible for designing, implementing, and maintaining client-side logig.',
          companyName: 'Amazon',
          companyLocation: 'Abdali',
          type: 'ONSITE',
          createdAt: '2024-07-18T22:42:44.976Z',
          updatedAt: '2024-07-18T22:42:44.976Z',
          applications: [],
          _count: {
            applications: 1,
          },
        },
        {
          id: 7,
          title: 't,,,,,',
          description: 'l',
          companyName: 'l',
          companyLocation: 'Abdali',
          type: 'HYBRID',
          createdAt: '2024-07-19T11:05:21.914Z',
          updatedAt: '2024-07-19T11:05:21.914Z',
          applications: [],
          _count: {
            applications: 1,
          },
        },
        {
          id: 9,
          title: 'ddd',
          description: 'ff',
          companyName: 'ggg',
          companyLocation: 'ggggaaaaaaag',
          type: 'HYBRID',
          createdAt: '2024-07-19T11:17:58.823Z',
          updatedAt: '2024-07-19T11:17:58.823Z',
          applications: [],
          _count: {
            applications: 1,
          },
        },
      ]);
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
      const id = 1,
        userId = 7;
      const result = await service.findOne(userId, id);
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
