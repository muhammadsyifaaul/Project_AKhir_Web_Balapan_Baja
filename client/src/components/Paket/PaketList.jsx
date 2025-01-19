export default function PaketList({
    no,
    namaPekerjaan,
    mulaiKontrak,
    selesaiKontrak,
    jangkaWaktu,
    npwpPenyedia,
    namaPenyedia,
  }) {
    const mulaiKontrakFormatted = formatTanggal(mulaiKontrak);
    const selesaiKontrakFormatted = formatTanggal(selesaiKontrak);
  
    return (
      <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h2>{no}</h2>
        <p>
          <strong>Nama Pekerjaan:</strong> {namaPekerjaan || "Nama pekerjaan tidak tersedia"}
        </p>
        <p>
          <strong>Periode Kontrak:</strong>{" "}
          {mulaiKontrakFormatted} - {selesaiKontrakFormatted} ({jangkaWaktu || "0"} Hari)
        </p>
        <p>
          <strong>NPWP Penyedia:</strong> {npwpPenyedia || "NPWP tidak tersedia"}
        </p>
        <p>
          <strong>Nama Penyedia:</strong> {namaPenyedia || "Nama penyedia tidak tersedia"}
        </p>
      </div>
    );
  }
  
  // Fungsi Format Tanggal
  function formatTanggal(tanggalString) {
    const tanggal = new Date(tanggalString); 
    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  