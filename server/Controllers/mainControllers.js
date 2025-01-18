const Penyedia = require("../Models/Penyedia");
const TenagaAhli = require("../Models/TenagaAhli");
const User = require("../Models/User");
const Opd = require("../Models/Opd");
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
  
  