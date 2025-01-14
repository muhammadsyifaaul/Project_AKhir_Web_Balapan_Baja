const mongoose = require("mongoose");
require('dotenv').config();
const { MONGO_URI } = process.env
const connectDb = async () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDb ;
