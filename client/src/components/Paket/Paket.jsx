import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PaketList from "./PaketList";

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
        currentItems.map((paket, index) => (
          <PaketList
            key={paket._id}
            idPaket={paket._id}
            no={index + 1 + indexOfFirstItem}
            opd={paket.opd}
            namaPekerjaan={paket.namaPekerjaan}
            mulaiKontrak={paket.mulaiKontrak}
            selesaiKontrak={paket.selesaiKontrak}
            jangkaWaktu={paket.jangkaWaktu}
            npwpPenyedia={paket.npwpPenyedia}
            namaPenyedia={paket.namaPenyedia}
            handleDelete={handleDelete}
          />
        ))
      ) : (
        <p>Data paket tidak ditemukan.</p>
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
