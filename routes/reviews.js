const express = require("express");
const router = express.Router({ mergeParams: true });
const {
    getItemReviews,
    addReview,
    deleteReview
} = require("../controllers/reviews");

const { protect } = require("../middleware/auth");

router
    .route("/")
    .get(getItemReviews)
    .post(protect, addReview);

router.route("/:reviewId").delete(protect, deleteReview);
// router.route(':itemId').get(getItemReviews);

module.exports = router;