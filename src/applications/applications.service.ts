import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateApplicationStatusDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}
  update(id: number, updateApplicationDto: UpdateApplicationStatusDto) {
    return this.prisma.application.update({
      where: {
        id,
      },
      data: updateApplicationDto,
    });
  }
}
