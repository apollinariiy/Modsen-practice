const meetupService = require('../services/meetupService');
const MeetupDto = require('../dtos/meetupDTO');

class meetupController {
    async getMeetups(req, res, next) {
        try {
            let { search, filter, sortByName, size, page} = req.query;
            let filterArr = [];
            if (filter) { filterArr = filter.split(',') }
            const meetups = await meetupService.getMeetups(search, filterArr, sortByName, size, page);
            return res.json(meetups);
        } catch (e) {
            next(e)
        }
    }

    async getMeetupByID(req, res, next) {
        try {
            const meetupID = req.params.meetupID
            const meetup = await meetupService.getMeetupByID(meetupID);
            return res.json(meetup);
        } catch (e) {
            next(e)
        }
    }

    async createMeetup(req, res, next) {
        try {
            const meetupDto = new MeetupDto(req.body);
            const createdMeetup = await meetupService.createMeetup(meetupDto);
            return res.json(createdMeetup);
        } catch (e) {
            next(e)
        }
    }

    async updateMeetup(req, res, next) {
        try {
            const meetupID = req.params.meetupID
            const meetupDto = new MeetupDto(req.body);
            const updatedMeetup = await meetupService.updateMeetup(meetupID, meetupDto);
            return res.json(updatedMeetup);
        } catch (e) {
            next(e)
        }
    }

    async deleteMeetup(req, res, next) {
        try {
            const meetupID = req.params.meetupID
            const deletedMeetup = await meetupService.deleteMeetup(meetupID);
            return res.json(deletedMeetup);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new meetupController()