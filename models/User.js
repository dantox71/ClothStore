const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },

    money: {
        type: Number,
        default: 100
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Please enter email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter correct email address"
        ]
    },

    password: {
        type: String,
        required: [true, "Please enter password"],
        select: false,
        minlength: [6, "Minimum password length is 6 characters"],
        maxlength: [21, "Maximum password length is 21 characters"]
    },

    image: {
        type: String,
        default: "user-image.jpg"
    },

    cart: [{
        name: {
            type: String,
            required: [true, "Please add  item name"]
        },

        description: {
            type: String,
            required: [true, "Please add item description"],
            minlength: [8, "Minimum description length should be at least 8 characters"],
            maxlength: [80, "Maximum description length should be at most 80 characters"]
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
            default: false,
            select: false
        },

        incart: {
            type: Boolean,
            default: false,
            select: false
        },

        image: {
            type: String,
            default: "item-image.jpg"
        },

        averageRating: {
            type: Number,
            select: false
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }],

    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.getJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Hash user password before saving in database
UserSchema.pre("save", async function(next) {
    //Hash password only if modified
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
});

module.exports = mongoose.model("User", UserSchema);