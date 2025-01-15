const mongoose = require("mongoose");
const argon2 = require("argon2");
const userSchema = new mongoose.Schema({
    nama: String,
    username: String,
    password: String,
    role: {
        type: String,
        enum: ["Admin OPD", "Super Admin"],
    }
});

userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        argon2.hash(this.password)
            .then(hash => {
                this.password = hash
                next()
            })
            .catch(err => {
                next(err)
            })
    } else {
        next() 
    }
})
const User = mongoose.model("User", userSchema);

module.exports = User;