const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["Admin OPD", "Super Admin"],
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;