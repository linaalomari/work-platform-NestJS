import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUserId } from 'src/auth/decorators/user.decorator';
import JwtAuthenticationGuard from 'src/auth/guards/jwt.guard';
import { SubmitApplicationDto } from './dto/submit-application.dto';
import { UserJobsService } from './user-jobs.service';

@UseGuards(JwtAuthenticationGuard)
@Controller('jobs')
export class UserJobsController {
  constructor(private readonly userJobsService: UserJobsService) {}

  @Get()
  findAll(@GetUserId() userId: number) {
    return this.userJobsService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUserId() userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.userJobsService.findOne(userId, id);
  }

  @Post(':id/submit')
  submitJobApplication(
    @GetUserId() userId: number,
    @Param('id', ParseIntPipe) jobId: number,
    @Body() submitApplicationDto: SubmitApplicationDto,
  ) {
    return this.userJobsService.submitApplication(
      userId,
      jobId,
      submitApplicationDto,
    );
  }
}
