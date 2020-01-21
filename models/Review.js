const mongoose = require('mongoose');






const ReviewSchema = new mongoose.Schema({

    text: {
        type: String,
        required: [true, 'Please add some text'],
        min: 8,
        max: 50
    },

    rate: {
        type: Number,
        required: [true, 'Please rate this item on a scale of 0 to 5 '],
        min: 0,
        max: 5
    },

    createdAt: {
        type: Date,
        default: Date.now
    },


    item: {
        ref: 'Item',
        type: mongoose.Types.ObjectId
    },


    user: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    }


})



module.exports = mongoose.model('Review', ReviewSchema);