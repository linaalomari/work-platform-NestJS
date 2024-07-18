import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UserJobsService } from './user-jobs.service';

@Controller('jobs')
export class UserJobsController {
  constructor(private readonly userJobsService: UserJobsService) {}

  @Get()
  findAll() {
    return this.userJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userJobsService.findOne(id);
  }

  @Post(':id/submit')
  submitJobApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() submitApplicationDto: SubmitApplicationDto,
  ) {
    return this.userJobsService.submitApplication(1, id, submitApplicationDto);
  }
}
