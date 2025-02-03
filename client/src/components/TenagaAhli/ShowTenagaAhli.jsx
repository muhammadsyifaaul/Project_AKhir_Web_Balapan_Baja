import React, { useState, useEffect } from "react";
import FormTambahTenagaAhli from "./FormTambahTenagaAhli";
import axios from "axios";
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "./TenagaAhli.css";

export default function ShowTenagaAhli({ notSuper }) {
  const [tenagaAhli, setTenagaAhli] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTenagaAhli, setSelectedTenagaAhli] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchTenagaAhli = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/getTenagaAhli`);
      setTenagaAhli(response.data);
    } catch (error) {
      console.error("Error fetching tenaga ahli:", error);
    }
  };

  useEffect(() => {
    fetchTenagaAhli();
  }, []);

  const handleOpenFormForEdit = (tenagaAhli = null) => {
    setSelectedTenagaAhli(tenagaAhli);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTenagaAhli(null);
  };

  const handleFormSubmit = async () => {
    await fetchTenagaAhli();
    handleCloseForm();
  };

  const handleDeleteTenagaAhli = async (id) => {
    try {
      if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/deleteTenagaAhli/${id}`);
        fetchTenagaAhli();
        alert("Data berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting tenaga ahli:", error);
    }
  };

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
    <div className="kelola-tenaga-ahli-container">
      <h1 className="page-title">
        <img src="images/rating.png" alt="rating" className="title-icon" />
        Tenaga Ahli
      </h1>
      <div className="actions-container">
        {!notSuper && (
          <button className="btn btn-primary" onClick={() => handleOpenFormForEdit()}>
            <AiOutlinePlus />
            Tambah Tenaga Ahli
          </button>
        )}
        <input
          type="text"
          placeholder="Cari tenaga ahli..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      {isFormOpen && (
        <FormTambahTenagaAhli
          onClose={handleCloseForm}
          onTenagaAhliUpdated={handleFormSubmit}
          initialData={selectedTenagaAhli}
        />
      )}

      <table className="tenaga-ahli-table">
        <thead>
          <tr>
            <th>No</th>
            <th>NPWP</th>
            <th>Nama</th>
            <th>Alamat</th>
            {!notSuper && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((tenaga, index) => (
            <tr key={tenaga._id}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td>{tenaga.npwp}</td>
              <td>{tenaga.nama}</td>
              <td>{tenaga.alamat}</td>
              {!notSuper && (
                <td className="action-buttons" style={{width: "100%"}}>
                  <button className="btn-edit" onClick={() => handleOpenFormForEdit(tenaga)}>
                    <AiOutlineEdit />
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteTenagaAhli(tenaga._id)}>
                    <AiOutlineDelete />
                  </button>
                  <button className="btn-detail" onClick={() => window.location.href = `/DetailTenagaAhli/${tenaga._id}`}>
                    <AiOutlineInfoCircle />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
