const mongoose = require('mongoose');






const ItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add  item name']
    },


    description: {
        type: String,
        required: [true, 'Please add item description'],
        min: 8,
        max: 80
    },


    category: {
        type: String,
        enum: ['shirts', 'hoodies', 'shoes', 'trousers']
    },


    price: {
        type: Number,
        required: [true, 'Please add item price']
    },


    onsell: {
        type: Boolean,
        default: false
    },


    image: {
        type: String,
        default: 'item-image.jpg'
    }

})

module.exports = mongoose.model('Item', ItemSchema);