import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [AuthModule],
  controllers: [MeetupController],
  providers: [MeetupService, PrismaService, JwtStrategy, RolesGuard, JwtAuthGuard],
})
export class MeetupModule {}
