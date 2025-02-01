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
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query)
        )
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

  const formatTanggal = (tanggalString) => {
    const tanggal = new Date(tanggalString);
    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="paket-container">
      <div id="Paket-form">
        <h2>Daftar Paket</h2>
        <button className="btn-tambah" onClick={handleTambahClick}>
          Tambah Paket
        </button>
        <div className="filter-search-container">
          <div className="filter-opd">
            <label htmlFor="opdFilter">Filter OPD: </label>
            <select id="opdFilter" value={selectedOpd} onChange={handleFilterChange}>
              <option value="">Semua OPD</option>
              {opdList.map((opd, index) => (
                <option key={index} value={opd}>
                  {opd}
                </option>
              ))}
            </select>
          </div>
          <div className="search-bar">
            <input
              id="searchQuery"
              type="text"
              placeholder="Cari paket..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {currentItems.length > 0 ? (
          <table>
            <thead>
              <tr>
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
                <tr key={paket._id}>
                  <td>{index + 1 + indexOfFirstItem}</td>
                  <td>{paket.opd}</td>
                  <td>{paket.namaPekerjaan}</td>
                  <td>{formatTanggal(paket.mulaiKontrak)}</td>
                  <td>{formatTanggal(paket.selesaiKontrak)}</td>
                  <td>{paket.jangkaWaktu}</td>
                  <td>{paket.npwpPenyedia}</td>
                  <td>{paket.namaPenyedia}</td>
                  <td>
                    <button className="detail" onClick={() => handleDetail(paket._id)}>
                      <i className="fas fa-info-circle"></i>
                    </button>
                    <button className="delete" onClick={() => handleDelete(paket._id)}>
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
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
