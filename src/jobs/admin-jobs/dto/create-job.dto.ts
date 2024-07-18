import { IsIn, IsOptional, IsString, MaxLength } from '@nestjs/class-validator';
import { JobType } from '@prisma/client';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  @MaxLength(65535)
  description: string;

  @IsString()
  companyName: string;

  @IsString()
  @IsOptional()
  companyLocation?: string;

  @IsIn(Object.values(JobType))
  @IsString()
  type: JobType;
}
