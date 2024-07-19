import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/users-repository/dto/create-user.dto';
import { UpdateUserDto } from 'src/users-repository/dto/update-user.dto';
import { UsersRepositoryService } from 'src/users-repository/users-repository.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepositoryService,
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            findByEmail: jest.fn().mockResolvedValue({}),
            findById: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepositoryService>(UsersRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      const result = await service.create(createUserDto);
      expect(result).toEqual({});
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('getByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const result = await service.getByEmail(email);
      expect(result).toEqual({});
      expect(repository.findByEmail).toHaveBeenCalledWith(email);
    });
  });

  describe('getById', () => {
    it('should return a user by id', async () => {
      const id = 1;
      const result = await service.getById(id);
      expect(result).toEqual({});
      expect(repository.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        /* add necessary properties */
      };
      const result = await service.update(id, updateUserDto);
      expect(result).toEqual({});
      expect(repository.update).toHaveBeenCalledWith(id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const id = 1;
      const result = await service.remove(id);
      expect(result).toEqual({});
      expect(repository.remove).toHaveBeenCalledWith(id);
    });
  });
});
