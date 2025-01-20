import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import ListPaket from "../components/Penyedia/ListPaket";

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
        <h1>List Paket</h1>
        {penyedias.map((penyedia, index) => (
          <ListPaket
            key={penyedia._id}
            no={index + 1}
            opd={penyedia.opd}
            idPaket={penyedia._id}
            namaPekerjaan={penyedia.namaPekerjaan}
            mulaiKontrak={penyedia.mulaiKontrak}
            selesaiKontrak={penyedia.selesaiKontrak}
            jangkaWaktu={penyedia.jangkaWaktu}
            nilaiKontrak={penyedia.nilaiKontrak}
          />
        ))}
      </div>
    );
  }
  