import React, { useState } from "react";
import axios from "axios";
import "./Paket.css";

export default function PaketList(props) {
  const {
    no,
    idPaket,
    opd,
    namaPekerjaan,
    mulaiKontrak,
    selesaiKontrak,
    jangkaWaktu,
    npwpPenyedia,
    namaPenyedia,
    nilaiKontrak,
    handleDelete, // ✅ Pastikan handleDelete diterima
    notSuper,
  } = props;

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setIsDeleting(true); // ✅ Set tombol menjadi loading
      try {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/deletePaket/${idPaket}`);
        alert("Data berhasil dihapus.");
        handleDelete(idPaket); // ✅ Hapus dari state di parent
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("Gagal menghapus data.");
      } finally {
        setIsDeleting(false); // ✅ Reset tombol setelah proses selesai
      }
    }
  };

  const formatTanggal = (tanggalString) => {
    const tanggal = new Date(tanggalString);
    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
      <h2>{no}</h2>
      {opd && <p><strong>OPD:</strong> {opd}</p>}
      <p><strong>Nama Pekerjaan:</strong> {namaPekerjaan || "Nama pekerjaan tidak tersedia"}</p>
      <p>
        <strong>Periode Kontrak:</strong>{" "}
        {formatTanggal(mulaiKontrak)} - {formatTanggal(selesaiKontrak)} ({jangkaWaktu || "0"} Hari)
      </p>
      {npwpPenyedia && <p><strong>NPWP Penyedia:</strong> {npwpPenyedia}</p>}
      {namaPenyedia && <p><strong>Nama Penyedia:</strong> {namaPenyedia}</p>}
      {nilaiKontrak && <p><strong>Nilai Kontrak:</strong> {nilaiKontrak}</p>}
      <a href={`/DetailPaket/${idPaket}`} style={{ marginRight: "10px" }}>
        Details
      </a>
      {!notSuper && (
        <button 
          onClick={handleDeleteClick} 
          disabled={isDeleting} 
          style={{
            backgroundColor: isDeleting ? "#ccc" : "#e74c3c",
            cursor: isDeleting ? "not-allowed" : "pointer",
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
}
