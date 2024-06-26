const Joi = require('joi');
const ApiError = require('../models/error');

class SingUserDto {
    constructor(model) {
        const schema = Joi.object({
            login: Joi.string().trim().min(3).max(255).required(),
            password: Joi.string().trim().min(6).required()
        });
        
        const { error, value } = schema.validate(model);
        if (error) {
            throw ApiError.BadRequest(`Validation error: ${error.details[0].message}`);
        }
        
        this.login = value.login;
        this.password = value.password;
    }
}

module.exports = SingUserDto;