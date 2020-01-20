const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const path = require("path");


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



    sendTokenResponse(user, 200, res);
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



// @desc   Update user data
// @route  PUT api/v1/auth/data
// @access Private
exports.updateUserData = asyncHandler(async(req, res, next) => {

    const { name, email } = req.body;
    const fieldsToUpdate = {};


    if (name) {
        fieldsToUpdate.name = name;
    }

    if (email) {
        fieldsToUpdate.email = email;
    }


    let user = await User.findOne({ email });




    if (user) {
        return next(new ErrorResponse(`Email already taken`, 400));
    }



    user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });




    res.status(200).json({
        success: true,
        data: user
    })


});





// @desc   Upload user photo
// @route  PUT api/v1/auth/me/photo
// @access Private
exports.uploadUserPhoto = asyncHandler(async(req, res, next) => {

    const user = await User.findById(req.user.id);



    //Check if photo has been uploaded
    if (!req.files) {
        return next(new ErrorResponse(`Please upload photo`, 404));
    }

    const file = req.files.file;


    //Check if image size isn't to big
    if (file.size > process.env.MAX_FILE_UPLOAD_SIZE) {
        return next(new ErrorResponse('Photo is to big', 400));
    }

    //Check if uploaded file is image
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('Please upload an image file', 400));
    }


    const fileExtension = path.extname(file.name);
    file.name = `user_photo_${user._id}${fileExtension}`;


    file.mv(`${process.env.FILE_UPLOAD_PATH}/users/${file.name}`, async(err) => {


        if (err) {

            return next(new ErrorResponse("Problem with file upload", 500));
        }

        await User.findByIdAndUpdate(req.user.id, { image: file.name });


        res.status(200).json({
            success: true,
            data: file.name
        })
    });

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



    sendTokenResponse(user, 200, res);

})





//Create token,set cookie & send response
const sendTokenResponse = async(user, statusCode, res) => {


    const token = await user.getJsonWebToken();




    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };


    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }




    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token: token
    })

}