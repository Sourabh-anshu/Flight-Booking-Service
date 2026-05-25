class AppError extends Error {
    constructor(message, StatusCode) {
        super(message);
        this.statusCode = StatusCode;
        this.explanation = message;
    }
}

module.exports = AppError;