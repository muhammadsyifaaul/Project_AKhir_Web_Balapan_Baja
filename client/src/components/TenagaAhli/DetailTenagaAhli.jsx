
import { useEffect,useState } from "react";

export default function DetailTenagaAhli({_id}) {
    const [allPaket, setAllPaket] = useState([]);
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
                        <h1>{index + 1}</h1>
                        <h1>{paket.opd}</h1>
                        <h1>{paket.namaPekerjaan}</h1>
                        <h1>{paket.mulaiKontrak}</h1>
                        <h1>{paket.selesaiKontrak}</h1>
                        <h1>{paket.jangkaWaktu}</h1>
                        <h1>{paket.npwpPenyedia}</h1>
                        <h1>{paket.namaPenyedia}</h1>
                        <h1>{paket.alamatPenyedia}</h1>
                        <h1>{paket.jenis}</h1>
                        <h1>{paket.nilaiKontrak}</h1>
                        <h1>{paket.tenagaAhli}</h1>
                    </div>)
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}