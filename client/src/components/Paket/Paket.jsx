import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Paket.css";

export default function Paket() {
  const navigate = useNavigate();
  const [paket, setPaket] = useState([]);
  const [filteredPaket, setFilteredPaket] = useState([]);
  const [opdList, setOpdList] = useState([]);
  const [selectedOpd, setSelectedOpd] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const getPaket = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllPaket");
        setPaket(response.data);
        setFilteredPaket(response.data);
        const uniqueOpd = [...new Set(response.data.map((item) => item.opd))];
        setOpdList(uniqueOpd);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPaket();
  }, []);

  const handleTambahClick = () => {
    navigate("/TambahPaket");
  };

  const handleFilterChange = (e) => {
    const opd = e.target.value;
    setSelectedOpd(opd);
    setSearchQuery("");
    setCurrentPage(1);

    if (opd === "") {
      setFilteredPaket(paket);
    } else {
      const filtered = paket.filter((item) => item.opd === opd);
      setFilteredPaket(filtered);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedOpd("");
    setCurrentPage(1);

    if (query === "") {
      setFilteredPaket(paket);
    } else {
      const searched = paket.filter((item) =>
        item.namaPekerjaan.toLowerCase().includes(query)
      );
      setFilteredPaket(searched);
    }
  };

  const handleDelete = (id) => {
    setFilteredPaket(filteredPaket.filter((item) => item._id !== id));
  };

  const handleDetail = (id) => {
    navigate(`/DetailPaket/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPaket.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPaket.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container" style={{ marginLeft: "10px" , marginTop: "0px" , marginBottom: "50px"}}> {/* Tambah style untuk geser ke kiri */}
      <div id="Paket-form">
        <h2>Daftar Paket</h2>
        <button
          className="btn-tambah"
          onClick={handleTambahClick}
          style={{
            width: "100px",
            marginBottom: "10px",
            padding: "8px 16px",
            backgroundColor: "#ff6e31",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            marginTop: "10px"
          }}
        >
          Tambah Paket
        </button>
        <div
          style={{
            marginBottom: "20px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="filter-search-container">
            <div>
              <label htmlFor="opdFilter">Filter OPD: </label>
              <select
                id="opdFilter"
                value={selectedOpd}
                onChange={handleFilterChange}
              >
                <option value="">Semua OPD</option>
                {opdList.map((opd, index) => (
                  <option key={index} value={opd}>
                    {opd}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="searchQuery">Pencarian: </label>
              <input
                id="searchQuery"
                type="text"
                placeholder="Cari nama pekerjaan..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  padding: "5px",
                  width: "250px",
                }}
              />
            </div>
          </div>
        </div>
        {currentItems.length > 0 ? (
          <table>
            <thead>
              <tr style={{ backgroundColor: "#ffcc00", color: "black" }}>
                <th>No</th>
                <th>OPD</th>
                <th>Nama Pekerjaan</th>
                <th>Mulai Kontrak</th>
                <th>Selesai Kontrak</th>
                <th>Jangka Waktu</th>
                <th>NPWP Penyedia</th>
                <th>Nama Penyedia</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((paket, index) => (
                <tr
                  key={paket._id}
                  style={{
                    backgroundColor: index % 2 === 1 ? "#f2f2f2" : "white",
                  }}
                >
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{paket.opd}</td>
                  <td>{paket.namaPekerjaan}</td>
                  <td>{paket.mulaiKontrak}</td>
                  <td>{paket.selesaiKontrak}</td>
                  <td>{paket.jangkaWaktu}</td>
                  <td>{paket.npwpPenyedia}</td>
                  <td>{paket.namaPenyedia}</td>
                  <td>
                    <button
                      className="detail"
                      onClick={() => handleDetail(paket._id)}
                    >
                      <i className="fas fa-info-circle"></i>
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(paket._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Data tidak ditemukan.</p>
        )}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
