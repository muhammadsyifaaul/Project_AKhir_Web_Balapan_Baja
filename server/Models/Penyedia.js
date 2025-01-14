const mongoose = require("mongoose");

const penyediaSchema = new mongoose.Schema({
    npwp: String,
    nama: String,
    alamat: String,
    slp: Number,
    jenis: {
        type: String,
        enum: ["Kecil", "Non Kecil"]
    }
});

const Penyedia = mongoose.model("Penyedia", penyediaSchema);

module.exports = Penyedia;