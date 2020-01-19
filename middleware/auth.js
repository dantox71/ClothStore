const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');



// @desc check if token exists and is correct 
exports.protect = asyncHandler(async(req, res, next) => {


    //Check if auth header exists & is correctly formatted
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return next(new ErrorResponse(`Token not found.`, 401));
    }




    const token = req.headers.authorization.split(' ')[1];


    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        req.user = decoded;


        next();

    } catch (err) {
        next(new ErrorResponse(`Token is incorrect`, 400));
    }





})