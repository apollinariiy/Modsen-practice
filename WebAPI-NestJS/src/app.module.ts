import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetupModule } from './meetup/meetup.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MeetupModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
