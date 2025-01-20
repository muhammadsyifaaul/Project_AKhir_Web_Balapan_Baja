export default function DetailPaketGlobal({no,opd,namaPekerjaan,mulaiKontrak,selesaiKontrak,jangkaWaktu,npwpPenyedia,namaPenyedia,alamatPenyedia,jenis,nilaiKontrak,tenagaAhli}) {
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
            <h1>{no}</h1>
                        <h1>{opd}</h1>
                        <h1>{namaPekerjaan}</h1>
                        <h1>{formatTanggal(mulaiKontrak)}</h1>
                        <h1>{formatTanggal(selesaiKontrak)}</h1>
                        <h1>{jangkaWaktu}</h1>
                        <h1>{npwpPenyedia}</h1>
                        <h1>{namaPenyedia}</h1>
                        <h1>{alamatPenyedia}</h1>
                        <h1>{jenis}</h1>
                        <h1>{nilaiKontrak}</h1>
                        {tenagaAhli ? <h1>{tenagaAhli}</h1> : null}
        </div>
    )
}