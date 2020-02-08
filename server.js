const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const colors = require("colors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

//Load enviroment variables
dotenv.config({ path: "./config/config.env" });

const items = require("./routes/items");
const auth = require("./routes/auth");
const reviews = require("./routes/reviews");
const cart = require("./routes/cart");

//Connect with DB
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(fileupload());

//NoSql injection protection
app.use(mongoSanitize());
//Security headers
app.use(helmet());
//Prevent Cross-site-scripting attacs
app.use(xss());

//Enable cors
app.use(cors());

//Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 1000 * 60, // 15 minutes
    max: 100
});

app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Colors library init
colors.enable();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Mount routes
app.use("/api/v1/items", items);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reviews", reviews);
app.use("/api/v1/cart", cart);

//Serve static assets in production
if (proccess.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode  on ${PORT} port`.yellow
    )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (result, promise) => {
    console.log(`Error:${result.message}`.red);

    //Close server and exit processes
    server.close(() => process.exit(1));
});