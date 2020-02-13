const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');



//Models
const Item = require('./models/Item');
const User = require('./models/User');
const Reviews = require('./models/Review');



dotenv.config({
    path: './config/config.env'
});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const items = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/items.json`, 'utf-8')
);


const users = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);


const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);


const importData = async() => {
    try {
        await Item.create(items);
        await User.create(users);
        await Reviews.create(reviews);
    } catch (err) {
        console.log(err);
    }


}



const removeData = async() => {

    try {
        await Item.deleteMany({});
        await User.deleteMany({});
        await Reviews.deleteMany({});

    } catch (err) {
        console.log(err);
    }

}


if (process.argv[2] === '-i') {
    importData();


    console.log('Data imported...'.green);
} else if (process.argv[2] === '-d') {
    removeData();


    console.log('Data removed...'.red);
}