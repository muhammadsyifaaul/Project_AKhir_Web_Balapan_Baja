import React, { useEffect, useState } from "react";
import PaketList from "../Paket/PaketList";

export default function DetailTenagaAhli({ _id,notSuper }) {
  const [allPaket, setAllPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPaketTenagaAhli = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getAllPaketTenagaAhli/${_id}`);
      const data = await response.json();
      if (response.status === 404) {
        setError(data.message);
      } else {
        setAllPaket(data);
      }
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaketTenagaAhli();
  }, [_id]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPaket = allPaket.filter(
    (paket) =>
      paket.opd.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paket.namaPekerjaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paket.mulaiKontrak.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paket.selesaiKontrak.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Detail Tenaga Ahli</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Cari data paket..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
        />
      </div>
      <table border="1" width="100%" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>No</th>
            <th>OPD</th>
            <th>Nama Pekerjaan</th>
            <th>Awal dan Akhir Kontrak / Jangka Waktu</th>
            <th>Nilai Kontrak (Rp)</th>
           {!notSuper && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {filteredPaket.length > 0 ? (
            filteredPaket.map((paket, index) => (
              <PaketList
                key={paket._id}
                no={index + 1}
                idPaket={paket._id}
                opd={paket.opd}
                namaPekerjaan={paket.namaPekerjaan}
                mulaiKontrak={paket.mulaiKontrak}
                selesaiKontrak={paket.selesaiKontrak}
                jangkaWaktu={paket.jangkaWaktu}
                nilaiKontrak={paket.nilaiKontrak}
                notSuper={notSuper}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Tidak ada data yang sesuai
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
