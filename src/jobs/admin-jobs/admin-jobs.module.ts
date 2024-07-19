import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminJobsController } from './admin-jobs.controller';
import { AdminJobsService } from './admin-jobs.service';

@Module({
  controllers: [AdminJobsController],
  providers: [AdminJobsService, PrismaService],
})
export class AdminJobsModule {}
