const mongoose = require("mongoose");

const penyediaSchema = new mongoose.Schema({
    NPWP: String,
    Nama: String,
    Alamat: String,
    SLP: Number,
    Jenis: {
        type: String,
        enum: ["Kecil", "Non Kecil"]
    }
});

const Penyedia = mongoose.model("Penyedia", penyediaSchema);

module.exports = Penyedia;