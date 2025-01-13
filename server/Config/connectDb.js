const mongoose = require("mongoose");
const connectDb = async () => {
    mongoose.connect('mongodb://localhost:27017/balapan_baja')
    .then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDb ;
