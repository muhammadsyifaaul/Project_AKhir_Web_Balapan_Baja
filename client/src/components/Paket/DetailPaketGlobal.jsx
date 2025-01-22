import TambahData from "./TambahData";
import MainContainer from "../MainLayout";

export default function DetailPaketGlobal({
  no,
  opd,
  namaPekerjaan,
  mulaiKontrak,
  selesaiKontrak,
  jangkaWaktu,
  npwpPenyedia,
  namaPenyedia,
  alamatPenyedia,
  jenis,
  nilaiKontrak,
  tenagaAhli,
  skp,
}) {
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
      <TambahData
        opdFromDetail={opd}
        namaPekerjaanFromDetail={namaPekerjaan}
        mulaiKontrakFromDetail={formatTanggal(mulaiKontrak)}
        selesaiKontrakFromDetail={formatTanggal(selesaiKontrak)}
        jangkaWaktuFromDetail={jangkaWaktu}
        npwpPenyediaFromDetail={npwpPenyedia}
        namaPenyediaFromDetail={namaPenyedia}
        alamatPenyediaFromDetail={alamatPenyedia}
        jenisFromDetail={jenis}
        skpFromDetail={skp}
        nilaiKontrakFromDetail={nilaiKontrak}
        tenagaAhliFromDetail={tenagaAhli}
        isFromDetail={true}
      />
    </div>
  );
}
