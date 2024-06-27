const prisma = require('../models/prisma')
const ApiError = require('../models/error');

class ParticipantService {
    async createParticipant(userID, meetupID) {
        const participant = await prisma.participants.findFirst({
            where:{
                userId: parseInt(userID),
                meetupId: parseInt(meetupID)
            }
        });
        if(participant != null) throw ApiError.BadRequest('You are already signed');
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