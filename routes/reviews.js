const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    getReviews,
    getItemReviews,
    addReview,
    deleteReview
} = require('../controllers/reviews');

const { protect } = require('../middleware/auth');



router.route('/').get(getReviews).post(protect, addReview).get(getItemReviews);
router.route('/:reviewId').delete(protect, deleteReview);





















module.exports = router;