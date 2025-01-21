import React, { useState, useEffect } from "react";
import TenagaAhli from "./TenagaAhli";
import FormTambahTenagaAhli from "./FormTambahTenagaAhli";
import axios from "axios";
import "./TenagaAhli.css";

export default function ShowTenagaAhli() {
  const [tenagaAhli, setTenagaAhli] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTenagaAhli, setSelectedTenagaAhli] = useState(null);

  const fetchTenagaAhli = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getTenagaAhli");
      setTenagaAhli(response.data);
    } catch (error) {
      console.error("Error fetching tenaga ahli:", error);
    }
  };

  const handleOpenFormForEdit = (tenagaAhli = null) => {
    setSelectedTenagaAhli(tenagaAhli);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTenagaAhli(null);
  };

  const handleDeleteTenagaAhli = async (id) => {

      try {
        if(window.confirm("Apakah Anda yakin ingin menghapus data ini?")){
          await axios.delete(`http://localhost:5000/deleteTenagaAhli/${id}`);
          fetchTenagaAhli();
          alert("Data berhasil dihapus");
        }
      } catch (error) {
        console.error("Error deleting tenaga ahli:", error);
      }

    
  };

  useEffect(() => {
    fetchTenagaAhli();
  }, []);

  return (
    <div>
      <button onClick={() => handleOpenFormForEdit()}>Tambah Tenaga Ahli</button>

      {isFormOpen && (
        <FormTambahTenagaAhli
          onClose={handleCloseForm}
          onTenagaAhliUpdated={fetchTenagaAhli}
          initialData={selectedTenagaAhli}
        />
      )}

      {tenagaAhli.map((tenaga, index) => (
        <TenagaAhli
          key={tenaga._id}
          no={index + 1}
          {...tenaga}
          onEdit={() => handleOpenFormForEdit(tenaga)}
          onDelete={() => handleDeleteTenagaAhli(tenaga._id)}
        />
      ))}
    </div>
  );
}
