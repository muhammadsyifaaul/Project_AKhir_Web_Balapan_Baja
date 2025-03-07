import { useEffect, useState } from "react";
import DetailPaketGlobal from "./DetailPaketGlobal";

export default function DetailPaket({idPaket}) {
    const [paket, setPaket] = useState({});

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                if (!idPaket) {
                    console.error("idPaket tidak ditemukan!");
                    return;
                }
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/getPaketById/${idPaket}`);
                if (!response.ok) {
                    throw new Error("Gagal mendapatkan data paket");
                }
                const data = await response.json();
                setPaket(data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPaket();
    }, [idPaket]);
    
    return (
        <div>
   
            {paket.opd ? (
                <>
          
                    <DetailPaketGlobal {...paket} />
                </>
            ) : (
                <h2>Loading...</h2>
            )}

        </div>
    )
}