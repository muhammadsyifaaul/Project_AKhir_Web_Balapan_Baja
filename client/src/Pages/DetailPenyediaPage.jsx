import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaketList from "../components/Paket/PaketList";
import MainContainer from "../components/MainLayout";

export default function DetailPenyediaPage({ notSuper }) {
  const { npwp } = useParams();
  const navigate = useNavigate();
  const [penyedias, setPenyedias] = useState([]);

  useEffect(() => {
    const fetchPenyedias = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getPenyedia/${npwp}`);
        const data = await response.json();
        setPenyedias(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPenyedias();
  }, [npwp]); // ✅ Tambahkan npwp agar data diperbarui jika berubah

  // ✅ Fungsi untuk menghapus data dari state
  const handleDelete = (idPaket) => {
    setPenyedias((prevPenyedias) => prevPenyedias.filter((paket) => paket._id !== idPaket));
  };

  return (
    <MainContainer>
      {penyedias.length > 0 ? (
        penyedias.map((penyedia, index) => (
          <PaketList
            key={penyedia._id}
            no={index + 1}
            idPaket={penyedia._id}
            opd={penyedia.opd}
            namaPekerjaan={penyedia.namaPekerjaan}
            mulaiKontrak={penyedia.mulaiKontrak}
            selesaiKontrak={penyedia.selesaiKontrak}
            jangkaWaktu={penyedia.jangkaWaktu}
            npwpPenyedia={penyedia.npwpPenyedia}
            namaPenyedia={penyedia.namaPenyedia}
            nilaiKontrak={penyedia.nilaiKontrak}
            notSuper={notSuper}
            handleDelete={handleDelete} // ✅ Kirim fungsi handleDelete ke PaketList
          />
        ))
      ) : (
        <p>No Data Available</p>
      )}
      <button onClick={() => navigate(-1)}>Kembali</button>
    </MainContainer>
  );
}
