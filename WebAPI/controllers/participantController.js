const ParticipantService = require('../services/participantService');

class ParticipantController {
    async createParticipant(req, res, next) {
        try {
            const { meetupID } = req.body;
            const userID = req.user.id;
            const participant = await ParticipantService.createParticipant(userID, meetupID);
            return res.json(participant);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ParticipantController