const Item = require("../models/Item");
const mongoose = require("mongoose");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

// @desc   Get all items  from logged in user cart
// @route  GET api/v1/cart
// @access Private
exports.getItemsFromCart = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    const items = user.cart;

    res.status(200).json({
        success: true,
        data: items
    });
});

// @desc   Add item to logged in user cart
// @route  POST api/v1/cart/:itemId
// @access Private
exports.addItemToCart = asyncHandler(async(req, res, next) => {
    let user = await User.findById(req.user.id);
    let item = await Item.findById(req.params.itemId);

    if (!item) {
        return next(
            new ErrorResponse(`Item with id of ${req.params.itemId} not found`, 404)
        );
    }

    //Check if item is already in someone's cart
    if (item.incart) {
        return next(new ErrorResponse(`Item is already in someone's cart`, 400));
    }

    //Check if item is on sell
    if (!item.onsell) {
        return next(new ErrorResponse("Item isn't on sell", 400));
    }

    //Make sure that item that user try add to cart isn't his own item
    if (item.user.toString() === req.user.id) {
        return next(new ErrorResponse(`You can't add your own item to cart`, 400));
    }

    await item.updateOne({ incart: true });

    user.cart.push(item);

    await user.save();

    res.status(201).json({
        success: true,
        data: item
    });
});

// @desc   Remove item from logged in user cart
// @route  DELETE api/v1/cart/:itemId
// @access Private

exports.removeItemFromCart = asyncHandler(async(req, res, next) => {
    let user = await User.findById(req.user.id);
    let item = await Item.findById(req.params.itemId);

    if (!item) {
        return next(
            new ErrorResponse(`Item with id of ${req.params.itemId} not found`, 404)
        );
    }

    //Set in cart of item to true
    item = await Item.findByIdAndUpdate(
        req.params.itemId, {
            incart: false
        }, {
            new: true
        }
    );

    const removeIndex = user.cart
        .map(item => item._id)
        .indexOf(req.params.itemId);

    user.cart.splice(removeIndex, 1);

    await user.save();

    res.status(201).json({
        success: true,
        data: user.cart
    });
});



// @desc   Clear user cart
// @route  DELETE api/v1/cart/clear
// @access Private 
exports.clearUserCart = asyncHandler(async(req, res, next) => {
    let user = await User.findById(req.user.id);


    user.cart.map(async item => {

        await Item.findByIdAndUpdate(item._id, {
            incart: false
        }, {
            runValidators: false
        })


    })


    user.cart = [];
    await user.save();



    res.status(200).json({
        success: true,
        data: user.cart
    });


})

//@desc
//   This function is responsible for transfering money to owners of bought by
//   logged in user items & changing owners of those items

// @route  POST api/v1/cart/buy
// @access Private

exports.buyItemsInCart = asyncHandler(async(req, res, next) => {
    let user = await User.findById(req.user.id);

    //Total amount to pay
    const total = user.cart.reduce((sum, item) => sum + item.price, 0);

    if (total > user.money) {
        return next(new ErrorResponse("You don't have enough money", 400));
    }

    //Change owners of items to logged in user
    user.cart.map(async item => {
        //Find owner of item
        let user = await User.findByIdAndUpdate(item.user, {
            $inc: { money: item.price }
        });

        //Change owner of user & delete from cart
        item = await Item.findByIdAndUpdate(item._id, {
            user: mongoose.Types.ObjectId(req.user.id),
            onsell: false,
            incart: false
        });
    });

    user.money -= total;
    user.cart = [];

    await user.save();

    res.status(200).json({
        success: true,
        data: "Items bought"
    });
});