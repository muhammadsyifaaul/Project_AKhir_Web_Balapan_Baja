import React, { useState, useEffect } from "react";
import Penyedia from "./Penyedia";
import FormPenyedia from "./FormPenyedia";
import "./Penyedia.css";
import axios from "axios";

export default function ShowPenyedia() {
  const [penyedias, setPenyedias] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPenyedia, setSelectedPenyedia] = useState(null);

  const handleOpenForm = (penyedia = null) => {
    setSelectedPenyedia(penyedia);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPenyedia(null);
  };

  const handlePenyediaAddedOrUpdated = async () => {
    try {
      const response = await fetch("http://localhost:5000/getPenyedia");
      const data = await response.json();
      setPenyedias(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeletePenyedia = async (id) => {
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        await axios.delete(`http://localhost:5000/deletePenyedia/${id}`);
        setPenyedias((prev) => prev.filter((penyedia) => penyedia._id !== id)); 
        alert("Data berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting penyedia:", error);
      alert("Gagal menghapus data");
    }
  };

  useEffect(() => {
    handlePenyediaAddedOrUpdated();
  }, []);

  return (
    <div className="penyedia-container">
      <button onClick={() => handleOpenForm()}>Tambah Penyedia</button>
      {penyedias.map((penyedia) => (
        <Penyedia
          key={penyedia._id}
          {...penyedia}
          onEdit={() => handleOpenForm(penyedia)}
          onDelete={handleDeletePenyedia}
        />
      ))}

      {isFormOpen && (
        <FormPenyedia
          onClose={handleCloseForm}
          onPenyediaAddedOrUpdated={handlePenyediaAddedOrUpdated}
          initialData={selectedPenyedia}
        />
      )}
    </div>
  );
}
