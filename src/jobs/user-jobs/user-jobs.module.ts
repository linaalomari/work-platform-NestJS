import { Module } from '@nestjs/common';
import { UserJobsService } from './user-jobs.service';
import { UserJobsController } from './user-jobs.controller';

@Module({
  controllers: [UserJobsController],
  providers: [UserJobsService]
})
export class UserJobsModule {}
