const express = require('express');
const router = express.Router();

const {
    getItems,
    getOnSellItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    uploadItemPhoto
} = require('../controllers/items');


const Item = require('../models/Item');


const advancedResults = require('../middleware/advancedResults');

router.route('/').get(advancedResults(Item), getItems).post(addItem);

router.route('/onsell').get(getOnSellItems);


router.route('/:id').get(getItem).put(updateItem).delete(deleteItem);



router.route('/:id/photo').put(uploadItemPhoto);



module.exports = router;