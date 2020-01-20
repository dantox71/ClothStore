const Item = require('../models/Item');
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const path = require('path');






// @desc   Get all items  
// @route  GET api/v1/items
// @access Public
exports.getItems = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});






// @desc   Get logged in user items
// @route  GET api/v1/items/me
// @access Pivater
exports.getLoggedInUserItems = asyncHandler(async(req, res, next) => {

    const items = await Item.find({
        user: req.user.id
    })



    res.status(200).json({
        success: true,
        data: items
    })
})



// @desc   Get only items that are on sell 
// @route  GET api/v1/items/onsell
// @access Public
exports.getOnSellItems = asyncHandler(async(req, res, next) => {


    const items = await Item.find({
        onsell: true
    });


    res.status(200).json({
        success: true,
        data: items
    })

});







// @desc   Get single item by it's ID
// @route  GET api/v1/items/:id
// @access Public
exports.getItem = asyncHandler(async(req, res, next) => {


    const item = await Item.findById(req.params.id);



    if (!item) {
        return next(new ErrorResponse(`Item with id of ${req.params.id} not found`, 404));
    }



    res.status(200).json({
        success: true,
        data: item
    })
});







// @desc   Add new item to database
// @route  POST api/v1/items
// @access Private
exports.addItem = asyncHandler(async(req, res, next) => {


    req.body.user = req.user.id;

    const item = await Item.create(req.body);





    res.status(200).json({
        success: true,
        data: item
    })


})




// @desc   Update item by it's id
// @route  PUT api/v1/items/:id
// @access Private
exports.updateItem = asyncHandler(async(req, res, next) => {


    let item = await Item.findById(req.params.id);




    if (!item) {
        return next(new ErrorResponse(`Item with id of ${req.params.id} not found`, 404));
    }


    //Make sure that authorized to update item
    if (item.user.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorzied to update this item', 401));
    }



    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })





    res.status(200).json({
        success: true,
        data: item
    })



})




// @desc   Delete item by it's id
// @route  DELETE api/v1/items/:id
// @access Private
exports.deleteItem = asyncHandler(async(req, res, next) => {


    const item = await Item.findById(req.params.id);




    if (!item) {
        return next(new ErrorResponse(`Item with id of ${req.params.id} not found`, 404));
    }


    //Make sure that authorized to update item
    if (item.user.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorzied to delete this item', 401));
    }




    await Item.findByIdAndDelete(req.params.id);



    res.status(200).json({
        success: true,
        data: {}
    })

})

// @desc   Upload item photo
// @route  PUT api/v1/items/id/photo
// @access Private
exports.uploadItemPhoto = asyncHandler(async(req, res, next) => {

    const item = await Item.findById(req.params.id);



    if (!item) {
        return next(new ErrorResponse(`Item with id of ${req.params.id} not found`, 404));
    }


    //Make sure that authorized to update item
    if (item.user.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized to update this item', 401));
    }



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
    file.name = `item_photo_${item._id}${fileExtension}`;


    file.mv(`${process.env.FILE_UPLOAD_PATH}/items/${file.name}`, async(err) => {


        if (err) {
            console.error(err);
            next(new ErrorResponse("Problem with file upload", 500));
        }

        await Item.findByIdAndUpdate(req.params.id, { image: file.name });


        res.status(200).json({
            success: true,
            data: file.name
        })
    });

})