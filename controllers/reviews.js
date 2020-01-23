const Item = require("../models/Item");
const User = require("../models/User");
const Review = require("../models/Review");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

// @desc  Get all reviews
// @route GET api/v1/reviews
// @access Public
exports.getReviews = asyncHandler(async(req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({
        success: true,
        data: reviews
    });
});

// @desc  Get reviews for item
// @route GET api/v1/items/:itemsId/reviews
// @access Public
exports.getItemReviews = asyncHandler(async(req, res, next) => {
    const item = await Item.findById(req.params.itemId);

    if (!item) {
        return next(
            new ErrorResponse(`Item with id of ${req.params.itemId} not found`, 404)
        );
    }

    const reviews = await Review.find({
        item: req.params.id
    });

    res.status(200).json({
        success: true,
        data: reviews
    });
});

// @desc   Add review for item
// @route  GET api/v1/items/:itemId/reviews
// @access Private
exports.addReview = asyncHandler(async(req, res, next) => {
    req.body.user = req.user.id;
    req.body.item = req.params.itemId;

    const item = await Item.findById(req.params.itemId);

    if (!item) {
        return next(
            new ErrorResponse(`Item with id of ${req.params.itemId} not found`, 404)
        );
    }

    const review = await Review.create(req.body);

    res.status(201).json({
        success: true,
        data: review
    });
});

// @desc   Delete review from item
// @route  DELETE api/v1/reviews/:reviewId
// @access Private
exports.deleteReview = asyncHandler(async(req, res, next) => {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
        return next(
            new ErrorResponse(
                `Review with id of ${req.params.reviewId} doesn't exist`,
                404
            )
        );
    }

    //Make sure that logged in user is owner of review that he is trying to delete
    if (review.user.toString() !== req.user.id) {
        return next(new ErrorResponse(`Not authorized to delete this review`, 401));
    }

    await review.delete();

    res.status(200).json({
        success: true,
        data: {}
    });
});