const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err };
    error.message = err.message;

    //Logs for devs
    console.log(error);

    //Validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);

        error = new ErrorResponse(message, 400);
    }

    // bad ObjectID
    if (err.name === "CastError") {
        const message = "Resource not found";

        error = new ErrorResponse(message, 404);
    }

    //Duplicate key value
    if (err.code === 11000) {
        const message = "Duplicate key value entered";

        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Problem with server"
    });
};

module.exports = errorHandler;