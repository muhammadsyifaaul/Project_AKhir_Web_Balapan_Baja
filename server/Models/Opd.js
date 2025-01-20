const mongoose = require("mongoose");

const opdSchema = new mongoose.Schema({
    namaOpd: String,
})

const Opd = mongoose.model("Opd", opdSchema);

module.exports = Opd;