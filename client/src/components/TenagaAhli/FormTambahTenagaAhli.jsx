import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Penyedia/FormPenyedia.css";

export default function FormTambahTenagaAhli({
  onClose,
  onTenagaAhliUpdated,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    npwp: initialData?.npwp || "",
    nama: initialData?.nama || "",
    alamat: initialData?.alamat || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await axios.put(
          `${import.meta.env.VITE_REACT_APP_API_URL}/updateTenagaAhli/${initialData._id}`,
          formData
        );
        alert("Data berhasil diperbarui!");
        onTenagaAhliUpdated();
        onClose();
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/TambahTenagaAhli`,
          formData
        );
        if (response.status === 200) {
          alert("Data berhasil disimpan!");
          onTenagaAhliUpdated();
          onClose();
        } else {
          alert("Gagal menyimpan data.");
        }
      }
  

    } catch (error) {
      console.error("Error saat menyimpan data:", error.message);
    }
  };
  

  return (
    <div className="form-overlay">
      <div className="form-box">
        <h1>{initialData ? "Edit Tenaga Ahli" : "Tambah Tenaga Ahli"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-bundle">
          <label htmlFor="npwp">NPWP</label>
          <input
            type="text"
            name="npwp"
            value={formData.npwp}
            onChange={handleChange}
            placeholder="NPWP"
            required
          />
          </div>
          <div className="form-bundle">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Nama"
            required
          />
          </div>
          <div className="form-bundle">
          <label htmlFor="alamat">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            required
          />
          </div>
          <div className="button">
          <button type="submit">Simpan</button>
          <button type="button" onClick={onClose}>
            Kembali
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
