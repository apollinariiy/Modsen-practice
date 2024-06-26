const ApiError = require('../models/error');
require('dotenv').config();

module.exports = async function (req, res, next) {
        if (req.user.role !== 'organizer') {
            return next(ApiError.Forbidden());
        }
        next()
};