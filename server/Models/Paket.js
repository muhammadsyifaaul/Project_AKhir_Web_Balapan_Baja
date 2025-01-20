const mongoose = require("mongoose");

const paketSchema = new mongoose.Schema({
    opd: String,
    namaPekerjaan: String,
    mulaiKontrak: Date,
    selesaiKontrak: Date,
    jangkaWaktu: Number,
    nomorKontrak: Number,
    npwpPenyedia: Number,
    namaPenyedia: String,
    jenis: String,
    alamatPenyedia: String,
    nilaiKontrak: Number,
    tenagaAhli: String,
    idTenagaAhli: String
})

const Paket = mongoose.model("Paket", paketSchema);

module.exports = Paket;