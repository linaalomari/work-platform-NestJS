import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubmitApplicationDto } from './dto/submit-application.dto';

@Injectable()
export class UserJobsService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.job.findMany({
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    // TODO: get user ID
    return this.prisma.job.findUniqueOrThrow({
      where: { id },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
      },
      // include: {
      //   applications: {
      //     where: {
      //       userId: 0,
      //     },
      //   },
      // },
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
