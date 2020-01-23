const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Please add some text"],
        min: 8,
        max: 50
    },

    rate: {
        type: Number,
        required: [true, "Please rate this item on a scale of 0 to 5 "],
        min: [0, "0 is minimum rating"],
        max: [5, "5 is maximium rating"]
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    item: {
        ref: "Item",
        type: mongoose.Types.ObjectId
    },

    user: {
        ref: "User",
        type: mongoose.Types.ObjectId
    }
});

//Calculate average rating to item
ReviewSchema.statics.getAverageRating = async function(itemId) {
    const obj = await this.aggregate([{
            $match: { item: itemId }
        },
        {
            $group: {
                _id: "$item",
                averageRating: { $avg: "$rate" }
            }
        }
    ]);

    try {
        await this.model("Item").findByIdAndUpdate(itemId, {
            averageRating: Math.round(obj[0].averageRating)
        });
    } catch (err) {
        console.log(err);
    }
};

ReviewSchema.post("save", function() {
    this.constructor.getAverageRating(this.item);
});

ReviewSchema.pre("remove", function() {
    this.constructor.getAverageRating(this.item);
});

module.exports = mongoose.model("Review", ReviewSchema);