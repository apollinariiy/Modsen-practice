const Joi = require('joi');
const ApiError = require('../models/error');

class MeetupDto {
    constructor(model) {
        const schema = Joi.object({
            title: Joi.string().trim().max(255).required(),
            description: Joi.string().trim().required(),
            tags: Joi.array().items(Joi.string().trim()).min(1).required(),
            date: Joi.date().iso().required().custom((value, helpers) => {
                const now = new Date();
                now.setHours(now.getHours() + 3);
                if (value <= now) {
                    return helpers.message('Date must be in the future');
                }
                return value;
            }),
            location: Joi.string().trim().required()
        });
        const { error, value } = schema.validate(model);
        if (error) {
            throw ApiError.BadRequest(`Validation error: ${error.details[0].message}`);
        }
        this.title = value.title;
        this.description = value.description;
        this.tags = value.tags;
        this.date = value.date;
        this.location = value.location;
    }
}

module.exports = MeetupDto;