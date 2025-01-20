import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PaketList from "./PaketList";

export default function Paket() {
  const navigate = useNavigate();
  const [paket, setPaket] = useState([]);

  useEffect(() => {
    const getPaket = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllPaket");
        setPaket(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPaket();
  }, []);
  const handleTambahClick = () => {
    navigate("/TambahPaket");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Paket</h1>
      <button onClick={handleTambahClick} style={{ marginBottom: "20px" }}>
        Tambah Paket
      </button>

      {paket.length > 0 ? (
        paket.map((paket, index) => (
          <PaketList
            key={paket._id}
            idPaket={paket._id}
            no={index + 1}
            namaPekerjaan={paket.namaPekerjaan}
            mulaiKontrak={paket.mulaiKontrak}
            selesaiKontrak={paket.selesaiKontrak}
            jangkaWaktu={paket.jangkaWaktu}
            npwpPenyedia={paket.npwpPenyedia}
            namaPenyedia={paket.namaPenyedia}
          />
        ))
      ) : (
        <p>Data paket tidak ditemukan.</p>
      )}
    </div>
  );
}
