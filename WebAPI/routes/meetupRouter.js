const express = require('express');
const meetupRouter = express.Router();
const controller = require('../controllers/meetupController');
const passport = require('../services/passportService');
const roleMiddleware = require('../middleware/roleMiddleware');

meetupRouter.get('/', passport.authenticate('jwt', { session: false }), controller.getMeetups);
meetupRouter.get('/:meetupID',  passport.authenticate('jwt', { session: false }), controller.getMeetupByID);
meetupRouter.post('/', passport.authenticate('jwt', { session: false }), roleMiddleware, controller.createMeetup);
meetupRouter.put('/:meetupID', passport.authenticate('jwt', { session: false }), roleMiddleware, controller.updateMeetup);
meetupRouter.delete('/:meetupID', passport.authenticate('jwt', { session: false }), roleMiddleware, controller.deleteMeetup);

module.exports = meetupRouter;


