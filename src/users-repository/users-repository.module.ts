import { Module } from '@nestjs/common';
import { UsersRepositoryService } from './users-repository.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UsersRepositoryService, PrismaService],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
