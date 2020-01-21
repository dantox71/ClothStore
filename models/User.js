const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name']
    },


    money: {
        type: Number,
        default: 100
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter email address'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter correct email address'
        ]

    },

    password: {
        type: String,
        required: [true, 'Please enter password'],
        select: false,
        min: 6,
        max: 21
    },

    image: {
        type: String,
        default: 'user-image.jpg'
    },



    createdAt: {
        type: Date,
        default: Date.now
    }

})




UserSchema.methods.getJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


UserSchema.methods.matchPassword = async function(enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
}

//Hash user password before saving in database
UserSchema.pre('save', async function(next) {


    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

})




module.exports = mongoose.model('User', UserSchema);