const Penyedia = require("../Models/Penyedia");
const TenagaAhli = require("../Models/TenagaAhli");
const User = require("../Models/User");
const Opd = require("../Models/Opd");
const Paket = require("../Models/Paket");
exports.getPenyedia = async (req, res) => {
    const penyedia = await Penyedia.find();
    console.log(penyedia);
    res.json(penyedia);
};

exports.getTenagaAhli = async (req, res) => {
    const tenagaAhli = await TenagaAhli.find();
    console.log(tenagaAhli);
    res.json(tenagaAhli);
}
exports.getAllUser = async (req, res) => {
    const user = await User.find();
    console.log(user);
    res.json(user);
}

exports.getAllOpd = async (req, res) => {
    const opd = await Opd.find();
    res.json(opd);
}
exports.cekNpwp = async (req, res) => {
    const npwp = req.params.npwp;
    const penyedia = await Penyedia.findOne({npwp:npwp});
    console.log(penyedia);
    res.json(penyedia);
}

exports.cekTenagaAhli = async (req, res) => {
    const { npwp, nama } = req.query; 
    const filter = {}; 
    if (npwp) filter.npwp = npwp;
    if (nama) filter.nama = nama; 
    console.log(filter);
  
    try {
      const tenagaAhli = await TenagaAhli.findOne(filter); 
      console.log(tenagaAhli);
      res.json(tenagaAhli); 
    } catch (error) {
      console.error("Error fetching tenaga ahli data:", error);
      res.status(500).json({ error: "Internal server error" }); 
    }
  };
  
  exports.tambahDataPaket = async (req, res) => {
    const {
        opd, namaPekerjaan, mulaiKontrak, selesaiKontrak, jangkaWaktu,
        nomorKontrak, nilaiKontrak, namaTenagaAhli,
        npwpPenyedia, namaPenyedia, alamatPenyedia,
        skp, jenis
    } = req.body;

    try {
        // if (typeof nilaiKontrak !== 'number' || nilaiKontrak <= 0) {
        //     return res.status(400).json({ message: "Invalid 'nilaiKontrak' value" });
        // }
        const penyedia = await Penyedia.findOne({ npwp: npwpPenyedia });
        if (!penyedia) {
            return res.status(404).json({ message: "Penyedia not found" });
        }
        // if (penyedia.skp - skp < 0) {
        //     return res.status(400).json({ message: "Insufficient SKP for the provider" });
        // }
        const paketData = {
            opd: opd,
            namaPekerjaan: namaPekerjaan,
            mulaiKontrak: mulaiKontrak,
            selesaiKontrak: selesaiKontrak,
            jangkaWaktu: jangkaWaktu,
            nomorKontrak: nomorKontrak,
            npwpPenyedia: npwpPenyedia,
            namaPenyedia: namaPenyedia,
            alamatPenyedia: alamatPenyedia,
            skp: skp,
            jenis: jenis,
            nilaiKontrak: nilaiKontrak,
        };

        if (nilaiKontrak >= 200000000) {
            paketData.namaTenagaAhli = namaTenagaAhli;
        }
        const paket = new Paket(paketData);

        await Promise.all([
            paket.save(),
            Penyedia.findOneAndUpdate(
                { npwp: npwpPenyedia },
                { $inc: { skp: -skp } }
            ),
        ]);
        console.log("Data inserted successfully");
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
        res.redirect(`${frontendUrl}/DataPaket`);
    } catch (error) {
        console.error("Error while inserting data:", error);
        res.status(500).json({ message: "Error while inserting data" });
    }
};

exports.getAllPaket = async (req,res) => {
    const paket = await Paket.find();
    console.log(paket);
    res.json(paket);
}
exports.tambahPenyedia = async (req, res) => {
    const {
        npwp, nama, alamat, skp, jenis} = req.body;
    const penyedia = new Penyedia({ npwp, nama, alamat, skp, jenis });
    await penyedia.save();
    console.log("Data inserted successfully");
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/Penyedia`);
}
exports.getPaketWithNpwp = async (req, res) => {
    const npwp = req.params.npwp;
    const paket = await Paket.find({ npwpPenyedia: npwp });
    console.log(paket);
    res.json(paket);
}
exports.getPaketById = async (req, res) => {
    const id = req.params.id;
    const paket = await Paket.findById(id);
    console.log(paket);
    res.json(paket);
}