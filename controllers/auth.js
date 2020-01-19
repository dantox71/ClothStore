const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');



// @desc   Register a user 
// @route  POST api/v1/auth/register
// @access Public
exports.register = asyncHandler(async(req, res, next) => {

    const { name, email, password } = req.body;



    let user = await User.findOne({ email });

    if (user) {
        return next(new ErrorResponse(`Email already taken`, 400));
    }



    user = await User.create({
        name,
        email,
        password
    });




    //Generate token
    const token = await user.getJsonWebToken();


    res.status(200).json({
        success: true,
        token: token
    })

})



// @desc   Get logged in user's data
// @route  GET api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async(req, res, next) => {

    const user = await User.findById(req.user.id);





    res.status(200).json({
        success: true,
        data: user
    })


});



// @desc   Authorize user
// @route  POST api/v1/auth/login
// @access Public
exports.login = asyncHandler(async(req, res, next) => {


    const user = await User.findOne({ email: req.body.email }).select('+password');



    if (!user) {
        return next(new ErrorResponse(`Invalid Credentials`, 400));
    }


    //Check if password is correct
    const isMatch = await user.matchPassword(req.body.password);



    if (!isMatch) {
        return next(new ErrorResponse(`Invalid Credentials`, 400));
    }

    const token = await user.getJsonWebToken();

    res.status(200).json({
        success: true,
        token: token
    })
})