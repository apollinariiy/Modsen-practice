import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MeetupDto } from './dto/meetup.dto';
import { SearchMeetupsDto } from './dto/searchMeetups.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MeetupService {
  constructor(private prisma: PrismaService) { }
  async create(dto: MeetupDto, userId: number) {
    return await this.prisma.meetups.create({
      data: {
        title: dto.title,
        description: dto.description,
        tags: dto.tags,
        date: new Date(dto.date),
        location: dto.location,
        userId: userId
      }
    });
  }

  async findAll(searchMeetupsDto: SearchMeetupsDto) {
    const { search, filter, order, page, size } = searchMeetupsDto;
    return await this.prisma.meetups.findMany({
      where: {
        title: {
          contains: search
        },
        tags: filter ? { hasSome: filter.split(',') } : undefined
      },
      orderBy: {
        title: order
      },
      skip: page && size ? (page - 1) * size : undefined,
      take: page && size ? +size : undefined
    });
  }

  async findOne(id: number) {
    const meetup = await this.prisma.meetups.findUnique({
      where: {
        id: id
      }
    })
    if (!meetup) throw new BadRequestException('Meetup does not exist');
    return meetup;
  }

  async update(id: number, userId:number, dto: Partial<MeetupDto>) {
    const meetup = await this.findOne(id);
    if(meetup.userId != userId) throw new ForbiddenException();
    return await this.prisma.meetups.update({
      where: {
        id: id
      },
      data: {
        title: dto.title,
        description: dto.description,
        tags: dto.tags,
        date: dto.date ? new Date(dto.date) : undefined,
        location: dto.location
      }
    });;
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.meetups.delete({
      where: {
        id: id
      }
    });
  }

  async subscribe(meetupId: number, userId: number) {
    await this.findOne(meetupId);
    return await this.prisma.participants.create({
      data: {
        meetupId: meetupId,
        userId: userId
      }
    })
  }
}
