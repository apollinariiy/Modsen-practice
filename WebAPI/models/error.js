module.exports = class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static NotFound() {
        return new ApiError(404, 'NotFound')
    }

    static Forbidden() {
        return new ApiError(403, 'Insufficient role')
    }
}