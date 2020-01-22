const express = require('express');
const router = express.Router();

const {
    getItemsFromCart,
    addItemToCart,
    removeItemFromCart,
    buyItemsInCart
} = require('../controllers/cart');



const { protect } = require('../middleware/auth');



router.route('/').get(protect, getItemsFromCart);
router.route('/buy').post(protect, buyItemsInCart);
router.route('/:itemId').post(protect, addItemToCart).delete(protect, removeItemFromCart);






module.exports = router;