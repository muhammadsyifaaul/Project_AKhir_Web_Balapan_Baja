import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailPaket({idPaket}) {
    const [paket, setPaket] = useState({});

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                if (!idPaket) {
                    console.error("idPaket tidak ditemukan!");
                    return;
                }
                const response = await fetch(`http://localhost:5000/getPaketById/${idPaket}`);
                if (!response.ok) {
                    throw new Error("Gagal mendapatkan data paket");
                }
                const data = await response.json();
                console.log("Data paket:", data);
                setPaket(data);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchPaket();
    }, [idPaket]);
    
    return (
        <div>
            <h1>Detail Paket</h1>
            {paket.opd ? (
                <>
                    <h1>{paket.opd}</h1>
                    <h1>{paket.namaPekerjaan}</h1>
                    <h1>{new Date(paket.mulaiKontrak).toLocaleDateString()}</h1>
                    <h1>{new Date(paket.selesaiKontrak).toLocaleDateString()}</h1>
                    <h1>{paket.jangkaWaktu} hari</h1>
                    <h1>{paket.nomorKontrak}</h1>
                    <h1>{paket.npwpPenyedia}</h1>
                    <h1>{paket.namaPenyedia}</h1>
                    <h1>{paket.alamatPenyedia}</h1>
                    <h1>{paket.jenis}</h1>
                    <h1>{paket.nilaiKontrak.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>
                    {paket.namaTenagaAhli && <h1>{paket.namaTenagaAhli}</h1>}
                </>
            ) : (
                <h2>Loading...</h2>
            )}

        </div>
    )
}