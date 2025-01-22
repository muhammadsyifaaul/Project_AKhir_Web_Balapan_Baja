import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PaketList from "./PaketList";
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
    navigate(`/DetailPaket/${id}`); // Arahkan ke halaman detail dengan ID
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPaket.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPaket.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Paket</h1>
      <button onClick={handleTambahClick} style={{ marginBottom: "20px" }}>
        Tambah Paket
      </button>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
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
            style={{ padding: "5px" }}
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
              <td>{paket.mulaiKontrak}</td>
              <td>{paket.selesaiKontrak}</td>
              <td>{paket.jangkaWaktu}</td>
              <td>{paket.npwpPenyedia}</td>
              <td>{paket.namaPenyedia}</td>
              <td>
                <button className="detail" onClick={() => handleDetail(paket._id)}>Detail</button>
                <button className="delete" onClick={() => handleDelete(paket._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <p>Data tidak ditemukan.</p>
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
    </div>
  );
}