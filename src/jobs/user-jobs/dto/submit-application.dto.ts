import { IsInt, IsNumber } from '@nestjs/class-validator';
import { IsString, MaxLength } from 'class-validator';

export class SubmitApplicationDto {
  @IsNumber()
  yearsOfExperience: number;

  @IsInt()
  noticePeriod: number;

  @IsNumber()
  expectedSalary: number;

  @IsString()
  @MaxLength(65535)
  briefIntro: string;
}
