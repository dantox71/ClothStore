const mongoose = require("mongoose");
const Review = require("./Review");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add  item name"]
    },

    description: {
        type: String,
        required: [true, "Please add item description"],
        min: 8,
        max: 80
    },

    category: {
        type: String,
        enum: ["shirts", "hoodies", "shoes", "trousers"],
        required: [true, "Please add item category"]
    },

    price: {
        type: Number,
        required: [true, "Please add item price"]
    },

    onsell: {
        type: Boolean,
        default: false
    },

    incart: {
        type: Boolean,
        default: false
    },

    image: {
        type: String,
        default: "item-image.jpg"
    },

    averageRating: {
        type: Number
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

//Delete all reviews of deleted item
ItemSchema.pre("remove", async function(next) {
    await Review.deleteMany({
        item: this._id
    });

    next();
});

module.exports = mongoose.model("Item", ItemSchema);