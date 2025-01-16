const mongoose = require("mongoose");

const paketSchema = new mongoose.Schema({
    opd: String,
    namaPekerjaan: String,
    mulaiKontrak: Date,
    selesaiKontrak: Date,
    nomorKontrak: Number,
    npwpPenyedia: Number,
    namaPenyedia: String,
    alamatPenyedia: String,
    nilaiKontrak: Number,
    namaTenagaAhli: String,
})

const Paket = mongoose.model("Paket", paketSchema);

module.exports = Paket;