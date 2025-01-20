const mongoose = require("mongoose");

const tenagaAhliSchema = new mongoose.Schema({
    npwp: Number,
    nama: String,
    alamat: String
})

const TenagaAhli = mongoose.model("TenagaAhli", tenagaAhliSchema);

module.exports = TenagaAhli;