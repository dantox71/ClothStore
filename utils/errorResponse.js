class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message); // Call Error constructor and override message
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;