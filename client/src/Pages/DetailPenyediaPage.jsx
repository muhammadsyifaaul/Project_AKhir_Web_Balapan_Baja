import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

import PaketList from "../components/Paket/PaketList";
import MainContainer from "../components/MainLayout";

export default function DetailPenyediaPage() {
    const { npwp } = useParams();
    const [penyedias, setPenyedias] = useState([]);
    useEffect(() => {
        const fetchPenyedias = async () => {
          try {
            const response = await fetch(`http://localhost:5000/getPenyedia/${npwp}`);
            const data = await response.json();
            console.log(data);
            setPenyedias(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchPenyedias();
    }, []);
  
    return (
      <div>
        <MainContainer>
        <h1>List Paket</h1>
        {penyedias.length > 0 ? (
          penyedias.map((penyedia, index) => (
            <PaketList
              key={index}
              no={index + 1}
              idPaket={penyedia._id}
              opd={penyedia.opd}
              namaPekerjaan={penyedia.namaPekerjaan}
              mulaiKontrak={penyedia.mulaiKontrak}
              selesaiKontrak={penyedia.selesaiKontrak}
              jangkaWaktu={penyedia.jangkaWaktu}
            />
          ))
        ) : (
          <p>No Data Avaible</p>
        )}
        </MainContainer>
      </div>
    );
  }
  