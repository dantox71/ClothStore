const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const colors = require('colors');
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');

//Load enviroment variables
dotenv.config({ path: './config/config.env' });



const items = require('./routes/items');
const auth = require('./routes/auth');
const reviews = require('./routes/reviews');





//Connect with DB
connectDB();



const app = express();




app.use(bodyParser.json());
app.use(fileupload());
app.use(cookieParser());


//Colors library init
colors.enable();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



app.get('/', (req, res) => {
    res.send('Hello, World');
})



//Mount routes
app.use('/api/v1/items', items);
app.use('/api/v1/auth', auth);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);




//Set public as a static folder
app.use(express.static('public'));



const PORT = process.env.PORT || 5000;







const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode  on ${PORT} port`.yellow));


//Handle unhandled promise rejections
process.on('unhandledRejection', (result, promise) => {
    console.log(`Error:${result.message}`.red);


    //Close server and exit processes
    server.close(() => process.exit(1));

})