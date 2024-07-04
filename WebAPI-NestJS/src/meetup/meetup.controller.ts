import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupDto } from './dto/meetup.dto';

@Controller('meetup')
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) { }

  @Post()
  async create(@Body() MeetupDto: MeetupDto) {
    return await this.meetupService.create(MeetupDto);
  }

  @Get()
  async findAll() {
    return await this.meetupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.meetupService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() MeetupDto: MeetupDto) {
    return await this.meetupService.update(+id, MeetupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.meetupService.remove(+id);
  }
}
