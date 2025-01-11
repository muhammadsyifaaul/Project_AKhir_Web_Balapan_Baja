const mongoose = require("mongoose");
const connectDb = async () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = { connectDb };
