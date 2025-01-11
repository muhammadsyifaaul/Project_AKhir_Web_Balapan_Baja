const mongoose = require("mongoose");

const paketSchema = new mongoose.Schema({
    OPD: String,
    NamaPekerjaan: String,
    MulaiKontrak: Date,
    SelesaiKontrak: Date,
    NomorKontrak: Number,
    NPWPPenyedia: Number,
    NamaPenyedia: String,
    AlamatPenyedia: String,
    NilaiKontrak: Number,
    NamaTenagaAhli: String,
})