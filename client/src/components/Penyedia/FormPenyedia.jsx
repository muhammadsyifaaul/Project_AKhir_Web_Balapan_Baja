import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FormPenyedia.css";

export default function FormPenyedia({ onClose, onPenyediaAddedOrUpdated, initialData }) {
  const [formData, setFormData] = useState({
    npwp: "",
    nama: "",
    alamat: "",
    skp: "",
    jenis: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        npwp: initialData.npwp || "",
        nama: initialData.nama || "",
        alamat: initialData.alamat || "",
        skp: initialData.skp || "",
        jenis: initialData.jenis || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      if (initialData) {
        await axios.put(`http://localhost:5000/editPenyedia/${initialData._id}`, formData);
        setSuccess("Penyedia berhasil diperbarui");
      } else {
        await axios.post("http://localhost:5000/TambahPenyedia", formData);
        setSuccess("Penyedia berhasil ditambahkan");
      }
      onPenyediaAddedOrUpdated();
      onClose();
    } catch (err) {
      setError("Gagal menyimpan data penyedia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-tambah-penyedia-overlay" onClick={onClose}>
      <div className="form-tambah-penyedia" onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? "Edit Penyedia" : "Tambah Penyedia"}</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-bundle">
            <label>NPWP</label>
            <input
              type="text"
              name="npwp"
              value={formData.npwp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-bundle">
            <label>Nama</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-bundle">
            <label>Alamat</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-bundle">
            <label>SKP</label>
            <input
              type="number"
              name="skp"
              value={formData.skp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-bundle">
            <label>Jenis</label>
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
          </div>
          <div className="button">
            <button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : initialData ? "Update" : "Simpan"}
            </button>
            <button type="button" onClick={onClose} disabled={loading}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
