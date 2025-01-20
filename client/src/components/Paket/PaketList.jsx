export default function PaketList(props) {
  const {
    no,
    idPaket,
    opd,
    namaPekerjaan,
    mulaiKontrak,
    selesaiKontrak,
    jangkaWaktu,
    npwpPenyedia,
    namaPenyedia,
    nilaiKontrak
  } = props;
  const noData = Object.values(props).every(value => value === undefined || value === '');

  if (noData) {
    return <div>Belum ada data paket</div>;
  }

  const mulaiKontrakFormatted = formatTanggal(mulaiKontrak);
  const selesaiKontrakFormatted = formatTanggal(selesaiKontrak);

  return (
    <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
      <h2>{no}</h2>
      {opd ? (<p><strong>OPD:</strong> {opd}</p>) : null}
      <p>
        <strong>Nama Pekerjaan:</strong> {namaPekerjaan || "Nama pekerjaan tidak tersedia"}
      </p>
      <p>
        <strong>Periode Kontrak:</strong>{" "}
        {mulaiKontrakFormatted} - {selesaiKontrakFormatted} ({jangkaWaktu || "0"} Hari)
      </p>
      {npwpPenyedia ? (<p><strong>NPWP Penyedia:</strong> {npwpPenyedia} </p>) : null}
      {namaPenyedia ? (<p><strong>Nama Penyedia:</strong> {namaPenyedia}</p>) : null}
      {nilaiKontrak ? (<p><strong>Nilai Kontrak:</strong> {nilaiKontrak}</p>) : null}
      <a href={`/DetailPaket/${idPaket}`}>Details</a>
    </div>
  );
}

function formatTanggal(tanggalString) {
  const tanggal = new Date(tanggalString);
  return tanggal.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
