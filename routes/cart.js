const express = require("express");
const router = express.Router();

const {
    getItemsFromCart,
    addItemToCart,
    removeItemFromCart,
    buyItemsInCart,
    clearUserCart
} = require("../controllers/cart");

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getItemsFromCart);
router.route("/buy").post(protect, buyItemsInCart);
router.route('/clear').delete(protect, clearUserCart);
router
    .route("/:itemId")
    .post(protect, addItemToCart)
    .delete(protect, removeItemFromCart);


module.exports = router;