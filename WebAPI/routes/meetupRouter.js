const express = require('express');
const meetupRouter = express.Router();
const controller = require('../controllers/meetupController');

meetupRouter.get('/', controller.getMeetups);
meetupRouter.get('/:meetupID', controller.getMeetupByID);
meetupRouter.post('/', controller.createMeetup);
meetupRouter.put('/:meetupID', controller.updateMeetup);
meetupRouter.delete('/:meetupID', controller.deleteMeetup);

module.exports = meetupRouter;