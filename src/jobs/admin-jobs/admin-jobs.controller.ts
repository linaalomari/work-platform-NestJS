import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/auth/guards/jwt.guard';
import { AdminJobsService } from './admin-jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-admin-job.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('admin/jobs')
export class AdminJobsController {
  constructor(private readonly adminJobsService: AdminJobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.adminJobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.adminJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminJobsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminJobDto: UpdateJobDto,
  ) {
    return this.adminJobsService.update(id, updateAdminJobDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.adminJobsService.remove(id);
  }
}
