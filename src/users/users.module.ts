import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepositoryModule } from 'src/users-repository/users-repository.module';
import { UsersRepositoryService } from 'src/users-repository/users-repository.service';

@Module({
  imports: [UsersRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepositoryService],
})
export class UsersModule {}
