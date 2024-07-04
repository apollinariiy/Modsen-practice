import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MeetupDto } from './dto/meetup.dto';

@Injectable()
export class MeetupService {
  constructor(private prisma: PrismaService) { }
  async create(dto: MeetupDto) {
    return await this.prisma.meetups.create({
      data: {
        title: dto.title,
        description: dto.description,
        tags: dto.tags,
        date: new Date(dto.date),
        location: dto.location,
        userId: 1
      }
    });
  }

  async findAll() {
    return await this.prisma.meetups.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.meetups.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: number, dto: MeetupDto) {
    return await this.prisma.meetups.update({
      where: {
        id: id
      },
      data: {
        title: dto.title,
        description: dto.description,
        tags: dto.tags,
        date: new Date(dto.date),
        location: dto.location
      }
    });;
  }

  async remove(id: number) {
    return await this.prisma.meetups.delete({
      where: {
        id: id
      }
    });
  }
}
