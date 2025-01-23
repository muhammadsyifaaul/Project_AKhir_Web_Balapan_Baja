import React, { useState, useEffect } from "react";
import Penyedia from "./Penyedia";
import FormPenyedia from "./FormPenyedia";
import "./Penyedia.css";
import axios from "axios";

export default function ShowPenyedia({ notSuper }) {
  const [penyedias, setPenyedias] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPenyedia, setSelectedPenyedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch data
  const handlePenyediaAddedOrUpdated = async () => {
    try {
      const response = await fetch("http://localhost:5000/getPenyedia");
      const data = await response.json();
      setPenyedias(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Open/close form
  const handleOpenForm = (penyedia = null) => {
    setSelectedPenyedia(penyedia);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedPenyedia(null);
  };

  // Delete penyedia
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

  // Optimasi pencarian, memeriksa setiap field agar tidak menyebabkan error
  const filteredPenyedias = penyedias.filter((penyedia) => {
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      (penyedia.nama && penyedia.nama.toLowerCase().includes(searchQueryLower)) ||
      (penyedia.alamat && penyedia.alamat.toLowerCase().includes(searchQueryLower)) ||
      (penyedia.jenis && penyedia.jenis.toLowerCase().includes(searchQueryLower)) ||
      (penyedia.npwp && penyedia.npwp.toString().toLowerCase().includes(searchQueryLower))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPenyedias.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPenyedias.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    handlePenyediaAddedOrUpdated();
  }, []);

  return (
    <div className="penyedia-container">
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleOpenForm()}>Tambah Penyedia</button>
        <input
          type="text"
          placeholder="Cari nama penyedia..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
          }}
        />
      </div>
      {currentItems.length > 0 ? (
        currentItems.map((penyedia, index) => (
          <Penyedia
            key={penyedia._id}
            {...penyedia}
            no={index + 1 + (currentPage - 1) * itemsPerPage}
            onEdit={() => handleOpenForm(penyedia)}
            onDelete={handleDeletePenyedia}
            notSuper={notSuper}
          />
        ))
      ) : (
        <p>Data penyedia tidak ditemukan.</p>
      )}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "#007bff" : "#ccc",
              color: currentPage === index + 1 ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

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
