import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryService } from './users-repository.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users-repository/dto/create-user.dto';
import { UpdateUserDto } from 'src/users-repository/dto/update-user.dto';

describe('UsersRepositoryService', () => {
  let service: UsersRepositoryService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepositoryService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn().mockResolvedValue({}),
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersRepositoryService>(UsersRepositoryService);
    prisma = module.get<PrismaService>(PrismaService);
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
      expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      const id = 1;
      const user = { id, email: 'test@example.com' };
      prisma.user.findUnique = jest.fn().mockResolvedValue(user);

      const result = await service.findById(id);
      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFoundException if user not found', async () => {
      const id = 1;
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      await expect(service.findById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { id: 1, email };
      prisma.user.findUniqueOrThrow = jest.fn().mockResolvedValue(user);

      const result = await service.findByEmail(email);
      expect(result).toEqual(user);
      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const id = 1;
      const updateUserDto: UpdateUserDto = {
        /* add necessary properties */
      };
      const updatedUser = { id, ...updateUserDto };
      prisma.user.update = jest.fn().mockResolvedValue(updatedUser);

      const result = await service.update(id, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updateUserDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      const id = 1;
      const result = await service.remove(id);
      expect(result).toEqual({});
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
