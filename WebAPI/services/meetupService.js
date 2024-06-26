const prisma = require('../models/prisma')
const ApiError = require('../models/error');

class MeetupService {
    async getMeetups(search, filter, order, size, page) {
        const meetups = await prisma.meetups.findMany({
            where: {
                title: {
                    contains: search
                },
                tags: filter.length > 0 ? { hasSome: filter } : undefined
            },
            orderBy: {
                title: order == 'asc' || order == 'desc' ? order : undefined
            },
            skip: page && size  ? parseInt(page-1)*parseInt(size) : undefined,
            take: page && size ? parseInt(size) : undefined
        });
        return meetups;
    }
    
    async getMeetupByID(meetupID) {
        if (!Number.isInteger(Number(meetupID))) throw ApiError.BadRequest('ID must be an integer');
        const meetup = await prisma.meetups.findFirst({
            where: {
                id: parseInt(meetupID)
            }
        })
        if (meetup == null) throw ApiError.NotFound();
        return meetup;
    }
    async createMeetup(userID, meetupDTO) {
        const createdMeetup = await prisma.meetups.create({
            data: {
                title: meetupDTO.title,
                description: meetupDTO.description,
                tags: meetupDTO.tags,
                date: new Date(meetupDTO.date),
                location: meetupDTO.location,
                userId: parseInt(userID)
            }
        });
        return createdMeetup;
    }
    async updateMeetup(meetupID, meetupDTO) {
        await this.getMeetupByID(meetupID);
        const updatedMeetup = await prisma.meetups.update({
            where: {
                id: parseInt(meetupID)
            },
            data: {
                title: meetupDTO.title,
                description: meetupDTO.description,
                tags: meetupDTO.tags,
                date: new Date(meetupDTO.date),
                location: meetupDTO.location
            }
        });
        return updatedMeetup;
    }
    async deleteMeetup(meetupID) {
        await this.getMeetupByID(meetupID);
        const deletedMeetup = prisma.meetups.delete({
            where: {
                id: parseInt(meetupID)
            }
        });
        return deletedMeetup;
    }
}

module.exports = new MeetupService()