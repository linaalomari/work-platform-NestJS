import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-admin-job.dto';

@Injectable()
export class AdminJobsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJobDto: CreateJobDto) {
    return this.prisma.job.create({
      data: createJobDto,
    });
  }

  findAll() {
    return this.prisma.job.findMany({
      include: { _count: { select: { applications: true } } },
    });
  }

  findOne(id: number) {
    return this.prisma.job.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        applications: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return this.prisma.job.update({ where: { id }, data: updateJobDto });
  }

  remove(id: number) {
    return this.prisma.job.delete({ where: { id } });
  }
}
