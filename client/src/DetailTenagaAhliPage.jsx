import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { useEffect, useState } from "react";
import Paket from "./components/Paket/Paket";
import "./DetailTenagaAhli.css";

export default function DetailTenagaAhliPage({ notSuper }) {
  const { id } = useParams(); // Ambil ID tenaga ahli dari URL
  const navigate = useNavigate();
  const [allPaket, setAllPaket] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPaketTenagaAhli = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/getAllPaketTenagaAhli/${id}`);
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
  }, [id]);

  const handleDelete = (idPaket) => {
    setAllPaket((prevPaket) => prevPaket.filter((paket) => paket._id !== idPaket));
  };

  return (
    <MainLayout>
      <div className="detail-tenagaahli-wrapper">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Paket fromTenagaAhli={true} allPaket={allPaket} notSuper={notSuper} handleDelete={handleDelete} />
        )}

       
      </div>
    </MainLayout>

  );
}
