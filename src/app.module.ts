import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { AdminJobsModule } from './jobs/admin-jobs/admin-jobs.module';
import { UserJobsModule } from './jobs/user-jobs/user-jobs.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersRepositoryModule } from './users-repository/users-repository.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ApplicationsModule,
    AuthModule,
    UsersRepositoryModule,
    PrismaModule,
    AdminJobsModule,
    UserJobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
