export default function ListPaket({idPaket,no,opd,namaPekerjaan,mulaiKontrak,selesaiKontrak,jangkaWaktu,nilaiKontrak}) {
    function formatTanggal(tanggalString) {
        const tanggal = new Date(tanggalString); 
        return tanggal.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
    return (
        <div>
            <h1>List Paket</h1>
            <h1>{no}</h1>
            <h1>{opd}</h1>
            <h1>{namaPekerjaan}</h1>
            <h1>{formatTanggal(mulaiKontrak)} - {formatTanggal(selesaiKontrak)} {jangkaWaktu} hari</h1>
            <h1>Rp.{nilaiKontrak}</h1>
            <a href={`/DetailPaket/${idPaket}`}>Details</a>
        </div>
    )
}