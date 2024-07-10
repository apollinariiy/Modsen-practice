import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Query, ParseIntPipe } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupDto } from './dto/meetup.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { SearchMeetupsDto } from './dto/searchMeetups.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Meetup')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('meetup')
@ApiBearerAuth()
export class MeetupController {
  constructor(private readonly meetupService: MeetupService) { }

  @Post()
  @Roles(['organizer'])
  async create(@Body() MeetupDto: MeetupDto, @Request() req) {
    return await this.meetupService.create(MeetupDto, req.user.id);
  }

  @Roles(['organizer', 'user'])
  @Get()
  async findAll(@Query() searchMeetupsDto: SearchMeetupsDto) {
    return await this.meetupService.findAll(searchMeetupsDto);
  }

  @Get(':id')
  @Roles(['organizer', 'user'])
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.meetupService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: MeetupDto })
  @Roles(['organizer'])
  async update(@Param('id', ParseIntPipe) id: number, @Body() meetupDto: Partial<MeetupDto>, @Request() req) {
    return await this.meetupService.update(id, req.user.id, meetupDto);
  }

  @Delete(':id')
  @Roles(['organizer'])
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.meetupService.remove(id);
  }

  @Post(':id')
  @Roles(['user'])
  async subscribe(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return await this.meetupService.subscribe(id, req.user.id);
  }
}
