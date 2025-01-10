const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const connectDb = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = { connectDb };
