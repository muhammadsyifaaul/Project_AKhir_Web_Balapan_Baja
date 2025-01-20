import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function FormTambahTenagaAhli({ onClose, onPenyediaAdded }) {
  const [formData, setFormData] = useState({
    npwp: "",
    nama: "",
    alamat: "",
  });

  const formRef = useRef(); // Referensi untuk mendeteksi klik di luar form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/TambahTenagaAhli", formData);
      console.log("Data berhasil dikirim:");
      setFormData({
        npwp: "",
        nama: "",
        alamat: "",
      });
      onPenyediaAdded();
      onClose();
    } catch (error) {
      console.error("Terjadi error saat mengirim data:", error.message);
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="form-overlay">
      <div className="form-box" ref={formRef}>
        
        <h1>Form Tambah Tenaga Ahli</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="npwp"></label>
          <input
            type="text"
            name="npwp"
            placeholder="Npwp"
            value={formData.npwp}
            onChange={handleChange}
          />
          <label htmlFor="nama"></label>
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={formData.nama}
            onChange={handleChange}
          />
          <label htmlFor="alamat"></label>
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
          <button onClick={onClose}>
          Kembali
        </button>
        </form>
      </div>
    </div>
  );
}
