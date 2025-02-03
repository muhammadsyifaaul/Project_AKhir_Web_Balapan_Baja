const Penyedia = require("../Models/Penyedia");
const TenagaAhli = require("../Models/TenagaAhli");
const User = require("../Models/User");
const Opd = require("../Models/Opd");
const Paket = require("../Models/Paket");

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
exports.getPenyedia = async (req, res) => {
  const penyedia = await Penyedia.find();
  res.json(penyedia);
};

exports.getTenagaAhli = async (req, res) => {
  const tenagaAhli = await TenagaAhli.find();
  res.json(tenagaAhli);
};
exports.getAllUser = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

exports.getAllOpd = async (req, res) => {
  const opd = await Opd.find();
  res.json(opd);
};
exports.cekNpwp = async (req, res) => {
  const npwp = req.params.npwp;
  const penyedia = await Penyedia.findOne({ npwp: npwp });
  if (penyedia) {
    res.json(penyedia);
  } else {
    res.status(404).json({ message: "Penyedia tidak ditemukan" });
  }
};

exports.cekTenagaAhli = async (req, res) => {
  const { npwp, nama } = req.query;
  const filter = {};
  if (npwp) filter.npwp = npwp;
  if (nama) filter.nama = nama;

  try {
    const tenagaAhli = await TenagaAhli.findOne(filter);
    res.json(tenagaAhli);
  } catch (error) {
    console.error("Error fetching tenaga ahli data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.tambahDataPaket = async (req, res) => {
  const {
    opd,
    namaPekerjaan,
    mulaiKontrak,
    selesaiKontrak,
    jangkaWaktu,
    nomorKontrak,
    nilaiKontrak,
    tenagaAhli,
    idTenagaAhli,
    npwpPenyedia,
    namaPenyedia,
    alamatPenyedia,
    skp,
    jenis,
  } = req.body;
  console.log(req.body);

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
      paketData.tenagaAhli = tenagaAhli;
      paketData.idTenagaAhli = idTenagaAhli;
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
    // const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/DataPaket`);
  } catch (error) {
    console.error("Error while inserting data:", error);
    res.status(500).json({ message: "Error while inserting data" });
  }
};

exports.getAllPaket = async (req, res) => {
  const paket = await Paket.find();
  res.json(paket);
};
exports.tambahPenyedia = async (req, res) => {
  const { npwp, nama, alamat, skp, jenis } = req.body;
  const penyedia = new Penyedia({ npwp, nama, alamat, skp, jenis });
  await penyedia.save();
  console.log("Data inserted successfully");
  // const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  // res.redirect(`${frontendUrl}/Penyedia`);
  res.status(200).json({ message: "Data inserted successfully" });
};
exports.getPaketWithNpwp = async (req, res) => {
  const npwp = req.params.npwp;
  const paket = await Paket.find({ npwpPenyedia: npwp });
  res.json(paket);
};
exports.getPaketById = async (req, res) => {
  const id = req.params.id;
  const paket = await Paket.findById(id);
  res.json(paket);
};

exports.tambahTenagaAhli = async (req, res) => {
  const { npwp, nama, alamat } = req.body;
  const tenagaAhli = new TenagaAhli({ npwp, nama, alamat });
  await tenagaAhli.save();
  console.log("Data inserted successfully");
  res.status(200).json({ message: "Data inserted successfully" });
};

exports.getAllPaketTenagaAhli = async (req, res) => {
  const id = req.params.id;
  try {
    const paket = await Paket.find({ idTenagaAhli: id });
    if (paket.length === 0) {
      return res.status(404).json({ message: "Belum ada data paket" });
    }
    res.json(paket);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
};

exports.addUser = async (req, res) => {
  const { username, name, password, role } = req.body;

  try {
    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ username, name, password, role });
    await user.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Error adding user" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

const argon2 = require("argon2");

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, name, password, role } = req.body;

  try {

    let hashedPassword;
    if (password) {
      hashedPassword = await argon2.hash(password); 
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { 
        username, 
        name, 
        password: hashedPassword || password, 
        role 
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};


exports.editPenyedia = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    if (!id || !updatedData) {
      return res.status(400).send("ID atau data penyedia tidak valid.");
    }

    const penyedia = await Penyedia.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!penyedia) {
      return res.status(404).send("Penyedia tidak ditemukan.");
    }

    res.status(200).send({ message: "Penyedia berhasil diperbarui", penyedia });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error updating penyedia", details: error.message });
  }
};

exports.deletePenyedia = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("ID tidak valid.");
    }
    const penyedia = await Penyedia.findByIdAndDelete(id);

    if (!penyedia) {
      return res.status(404).send("Penyedia tidak ditemukan.");
    }
    res.status(200).send({ message: "Penyedia berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Gagal menghapus penyedia", details: error.message });
  }
};
exports.updateTenagaAhli = async (req, res) => {
  try {
    const id = req.params.id;
    const { npwp, nama, alamat } = req.body;
    const updatedData = await TenagaAhli.findByIdAndUpdate(
      id,
      { npwp, nama, alamat },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Data berhasil diperbarui", data: updatedData });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteTenagaAhli = async (req, res) => {
  try {
    const id = req.params.id;
    await TenagaAhli.findByIdAndDelete(id);
    res.status(200).send({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
exports.deletePaket = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Menghapus paket dengan ID:", id); // Debugging

    const deletedPaket = await Paket.findByIdAndDelete(id);

    if (!deletedPaket) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data berhasil dihapus", deletedPaket });
  } catch (error) {
    console.error("Error deleting paket:", error);
    res.status(500).json({ error: error.message });
  }
};
