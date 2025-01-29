import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useEffect, useState } from "react";
import Paket from "../components/Paket/Paket";

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
  }, [npwp]);

  const handleDelete = (idPaket) => {
    setPenyedias((prevPenyedias) => prevPenyedias.filter((paket) => paket._id !== idPaket));
  };

  return (
    <MainLayout>
      <Paket fromPenyedia={true} penyedias={penyedias} notSuper={notSuper} handleDelete={handleDelete} />
      <button onClick={() => navigate(-1)}>Kembali</button>
    </MainLayout>
  );
}
