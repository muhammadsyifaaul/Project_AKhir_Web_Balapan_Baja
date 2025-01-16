const mongoose = require("mongoose");

const tenagaAhliSchema = new mongoose.Schema({
    npwp: Number,
    nama: String,
    alamat: String,
    skp: Number
})

const TenagaAhli = mongoose.model("TenagaAhli", tenagaAhliSchema);

module.exports = TenagaAhli;