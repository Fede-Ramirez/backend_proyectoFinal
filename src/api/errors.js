const ErrorStatus = {
    BadRequest: 400,
    NotFound: 404,
};

class ApiError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};

module.exports = {
    ErrorStatus,
    ApiError
};
