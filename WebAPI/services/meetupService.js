const prisma = require('../models/prisma')
const ApiError = require('../models/error');

class MeetupService {
    async getMeetups() {
        const meetups = await prisma.meetups.findMany();
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
    async createMeetup(meetupDTO) {
        const createdMeetup = await prisma.meetups.create({
            data: {
                title: meetupDTO.title,
                description: meetupDTO.description,
                tags: meetupDTO.tags,
                date: new Date(meetupDTO.date),
                location: meetupDTO.location
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