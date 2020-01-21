const express = require('express');
const router = express.Router();

const {
    getItems,
    getOnSellItems,
    getLoggedInUserItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    uploadItemPhoto
} = require('../controllers/items');


const reviewRouter = require('./reviews');




router.use('/:itemId/reviews', reviewRouter);



const Item = require('../models/Item');


const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');




router.route('/').get(advancedResults(Item), getItems).post(protect, addItem);
router.route('/onsell').get(getOnSellItems);
router.route('/me').get(protect, getLoggedInUserItems);
router.route('/:id').get(getItem).put(protect, updateItem).delete(protect, deleteItem);
router.route('/:id/photo').put(protect, uploadItemPhoto);



module.exports = router;