const express = require('express');
const participantRouter = express.Router();
const controller = require('../controllers/participantController');
const passport = require('../services/passportService');

participantRouter.post('/', passport.authenticate('jwt', { session: false }), controller.createParticipant);

module.exports = participantRouter;