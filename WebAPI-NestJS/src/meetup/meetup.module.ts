import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MeetupController],
  providers: [MeetupService, PrismaService],
})
export class MeetupModule {}
