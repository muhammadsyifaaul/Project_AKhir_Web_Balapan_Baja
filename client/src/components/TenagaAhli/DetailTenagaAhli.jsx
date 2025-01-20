
import { useEffect,useState } from "react";
import DetailPaketGlobal from "../Paket/DetailPaketGlobal";
import PaketList from "../Paket/PaketList";

export default function DetailTenagaAhli({_id}) {
    const [allPaket, setAllPaket] = useState([]);
    function formatTanggal(tanggalString) {
        const tanggal = new Date(tanggalString); 
        return tanggal.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
    useEffect(() => {
        const fetchTenagaAhli = async () => {
            try {
                const response = await fetch(`http://localhost:5000/getAllPaketTenagaAhli/${_id}`);
                const data = await response.json();
                console.log(data);
                setAllPaket(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchTenagaAhli();
    },[])
    return (
        <div>
            <h1>Detail Tenaga Ahli Page</h1>
            {allPaket ? (
                allPaket.map((paket,index) => (
                    <div key={paket._id}>
                        {/* <DetailPaketGlobal {...paket} no={index + 1} mulaiKontrak={formatTanggal(paket.mulaiKontrak)} selesaiKontrak={formatTanggal(paket.selesaiKontrak)} /> */}
                        <PaketList no={index + 1} 
                        idPaket={paket._id}
                        opd={paket.opd}
                        namaPekerjaan={paket.namaPekerjaan} 
                        mulaiKontrak={paket.mulaiKontrak}
                        selesaiKontrak={paket.selesaiKontrak}
                        jangkaWaktu={paket.jangkaWaktu}
                        nilaiKontrak={paket.nilaiKontrak}
                        />
                    </div>)
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}