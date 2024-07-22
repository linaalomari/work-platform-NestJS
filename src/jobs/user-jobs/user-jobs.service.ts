import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';

@Injectable()
export class UserJobsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll(userId: number) {
    return this.prisma.job.findMany({
      include: {
        applications: {
          where: {
            userId,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });
  }

  findOne(userId: number, id: number) {
    return this.prisma.job.findUniqueOrThrow({
      where: { id },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
        applications: {
          where: {
            userId,
          },
        },
      },
    });
  }

  submitApplication(
    userId: number,
    jobId: number,
    submitApplicationDto: SubmitApplicationDto,
  ) {
    return this.prisma.application.create({
      data: {
        userId,
        jobId,
        ...submitApplicationDto,
      },
    });
  }
}
