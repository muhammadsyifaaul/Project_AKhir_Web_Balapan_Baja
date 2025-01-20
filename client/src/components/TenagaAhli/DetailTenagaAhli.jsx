import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaketList from "../Paket/PaketList";

export default function DetailTenagaAhli({ _id }) {
    // const { _id } = useParams(); 
    const [allPaket, setAllPaket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        fetchTenagaAhli();
    }, [_id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Detail Tenaga Ahli Page</h1>
            {allPaket.length > 0 ? (
                allPaket.map((paket, index) => (
                    <div key={paket._id}>
                        <PaketList 
                            no={index + 1} 
                            idPaket={paket._id}
                            opd={paket.opd}
                            namaPekerjaan={paket.namaPekerjaan} 
                            mulaiKontrak={paket.mulaiKontrak}
                            selesaiKontrak={paket.selesaiKontrak}
                            jangkaWaktu={paket.jangkaWaktu}
                            nilaiKontrak={paket.nilaiKontrak}
                        />
                    </div>
                ))
            ) : (
                <p>Belum ada data paket</p>
            )}
        </div>
    );
}
