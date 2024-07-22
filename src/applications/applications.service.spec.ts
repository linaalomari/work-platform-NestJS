import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationStatusDto } from './dto/update-application.dto';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: PrismaService,
          useValue: {
            application: {
              update: jest.fn().mockResolvedValue({
                id: 1,
                status: 'updated-status',
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should update an application status', async () => {
      const id = 1;
      const updateApplicationDto: UpdateApplicationStatusDto = {
        status: ApplicationStatus.ACCEPTED,
      };
      const result = await service.update(id, updateApplicationDto);
      expect(result).toEqual({});
      expect(prisma.application.update).toHaveBeenCalledWith({
        where: { id },
        data: updateApplicationDto,
      });
    });
  });
});
