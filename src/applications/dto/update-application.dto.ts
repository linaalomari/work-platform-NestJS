import { ApplicationStatus } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsIn(Object.values(ApplicationStatus))
  @IsString()
  status: ApplicationStatus;
}
