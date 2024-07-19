import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/users-repository/dto/create-user.dto';
import { UpdateUserDto } from 'src/users-repository/dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            getById: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'Lina',
        lastName: 'Al-Omari',
        email: 'linaomari99@gmail.com',
        hashedPassword:
          '$2b$10$c76qs1XZzXALkaeb6Bhd1u6Sl4LDt9KL0GsQoyOPiGEgc6ZUUZZw.',
        location: 'Amman',
        phoneNumber: '0798956362',
      };
      const result = await controller.create(createUserDto);
      expect(result).toEqual({});
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const id = 1;
      const result = await controller.findOne(id);
      expect(result).toEqual({});
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = {
        /* add necessary properties */
      };
      const result = await controller.update(id, updateUserDto);
      expect(result).toEqual({});
      expect(service.update).toHaveBeenCalledWith(+id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const id = '1';
      const result = await controller.remove(id);
      expect(result).toEqual({});
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
