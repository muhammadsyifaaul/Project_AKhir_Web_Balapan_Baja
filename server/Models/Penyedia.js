const mongoose = require("mongoose");

const penyediaSchema = new mongoose.Schema({
    npwp: String,
    nama: String,
    alamat: String,
    skp: Number,
    jenis: {
        type: String,
        enum: ["Kecil", "Non Kecil"]
    }
});
penyediaSchema.pre("save", function (next) {
    if (this.skp <= 3) {
        this.jenis = "Kecil";
    } else {
        this.jenis = "Non Kecil";
    }
    next();
});

const Penyedia = mongoose.model("Penyedia", penyediaSchema);

module.exports = Penyedia;