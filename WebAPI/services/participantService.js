const prisma = require('../models/prisma')
const ApiError = require('../models/error');

class ParticipantService {
    async createParticipant(userID, meetupID) {
        const createdParticipant = await prisma.participants.create({
            data: {
                userId: parseInt(userID),
                meetupId: parseInt(meetupID)
            }
        });
        return createdParticipant;
    }
}

module.exports= new ParticipantService;