const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getReviews,
    getReview,
    getItemReviews,
    addReview,
    deleteReview
} = require("../controllers/reviews");

const { protect } = require("../middleware/auth");

router
    .route("/")
    .get(getItemReviews)
    .post(protect, addReview)

router.route("/:reviewId").get(getReview).delete(protect, deleteReview);
// router.route(':itemId').get(getItemReviews);

module.exports = router;