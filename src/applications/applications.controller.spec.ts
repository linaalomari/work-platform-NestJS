import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationStatus } from '@prisma/client';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationStatusDto } from './dto/update-application.dto';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;
  let service: ApplicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
      providers: [
        {
          provide: ApplicationsService,
          useValue: {
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
    service = module.get<ApplicationsService>(ApplicationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('update', () => {
    it('should update an application', async () => {
      const id = 1;
      const updateApplicationDto: UpdateApplicationStatusDto = {
        status: ApplicationStatus.ACCEPTED,
      };
      const result = await controller.update(id, updateApplicationDto);
      expect(result).toEqual({});
      expect(service.update).toHaveBeenCalledWith(id, updateApplicationDto);
    });
  });
});
