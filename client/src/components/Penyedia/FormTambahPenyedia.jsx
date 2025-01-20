import { useState } from "react";
import axios from "axios";

export default function FormTambahPenyedia({ onClose, onPenyediaAdded }) {
  const [formData, setFormData] = useState({
    npwp: 0,
    nama: "",
    alamat: "",
    skp: 0,
    jenis: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/TambahPenyedia", formData);
      console.log("Data berhasil dikirim:", response.data);
      
      // Reset form data
      setFormData({
        npwp: 0,
        nama: "",
        alamat: "",
        skp: 0,
        jenis: "",
      });
      
      // Notify parent component and close the form
      console.log("Calling onPenyediaAdded");
      onPenyediaAdded();
      console.log("Calling onClose");
      onClose();
    } catch (error) {
      console.error("Terjadi error saat mengirim data:", error.message);
    }
  };

  const handleFormClick = (e) => e.stopPropagation();

  return (
    <div className="form-tambah-penyedia-overlay" onClick={onClose}>
      <div className="form-tambah-penyedia" onClick={handleFormClick}>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="npwp"
            placeholder="NPWP"
            value={formData.npwp}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="skp"
            placeholder="SKP"
            value={formData.skp}
            onChange={handleChange}
            required
          />
          <select
            name="jenis"
            value={formData.jenis}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Jenis</option>
            <option value="Kecil">Kecil</option>
            <option value="Non Kecil">Non Kecil</option>
          </select>
          <button type="submit">Simpan</button>
          <button type="button" onClick={onClose}>
            Kembali
          </button>
        </form>
      </div>
    </div>
  );
}