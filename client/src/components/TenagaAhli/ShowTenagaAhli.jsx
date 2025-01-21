import React, { useState, useEffect } from "react";
import TenagaAhli from "./TenagaAhli";
import FormTambahTenagaAhli from "./FormTambahTenagaAhli";
import axios from "axios";
import "./TenagaAhli.css";

export default function ShowTenagaAhli() {
  const [tenagaAhli, setTenagaAhli] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTenagaAhli, setSelectedTenagaAhli] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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
      if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredTenagaAhli = tenagaAhli.filter(
    (tenaga) =>
      tenaga.npwp.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenaga.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenaga.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTenagaAhli.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTenagaAhli.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      <input
        type="text"
        placeholder="Cari tenaga ahli..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ margin: "10px 0", padding: "8px", width: "100%" }}
      />

      {currentItems.map((tenaga, index) => (
        <TenagaAhli
          key={tenaga._id}
          no={indexOfFirstItem + index + 1}
          {...tenaga}
          onEdit={() => handleOpenFormForEdit(tenaga)}
          onDelete={() => handleDeleteTenagaAhli(tenaga._id)}
        />
      ))}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#fff",
              color: currentPage === i + 1 ? "#fff" : "#000",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
