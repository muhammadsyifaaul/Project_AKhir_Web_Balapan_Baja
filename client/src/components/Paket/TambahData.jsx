import React from "react";
import { useTambahData } from "./logic/useTambahData";

export default function TambahData() {
  const {
    mulaiKontrak,
    setMulaiKontrak,
    selesaiKontrak,
    setSelesaiKontrak,
    jangkaWaktu,
    npwpPenyedia,
    setNpwpPenyedia,
    opd,
    nilaiKontrak,
    dataPenyedia, 
    inputTenagaAhli,
    idTenagaAhli,
    handleNilaiKontrak,
    handleInputTenagaAhli,
    cekNpwp,
    cekTenagaAhli,
    handleResetState,
  } = useTambahData();

  return (
    <div>
      <form
        action="http://localhost:5000/TambahDataPaket"
        method="post"
        autoComplete="off"
      >
        <label htmlFor="opd">OPD</label>
        <select name="opd" id="opd">
          <option value="">Pilih OPD</option>
          {opd.map((opd) => (
            <option key={opd._id} value={opd.namaOpd}>
              {opd.namaOpd}
            </option>
          ))}
        </select>

        <label htmlFor="namaPekerjaan">Nama Pekerjaan</label>
        <textarea name="namaPekerjaan" id="namaPekerjaan"></textarea>

        <label htmlFor="mulaiKontrak">Mulai Kontrak</label>
        <input
          type="date"
          name="mulaiKontrak"
          id="mulaiKontrak"
          value={mulaiKontrak}
          onChange={(e) => setMulaiKontrak(e.target.value)}
          required
        />

        <label htmlFor="selesaiKontrak">Selesai Kontrak</label>
        <input
          type="date"
          name="selesaiKontrak"
          id="selesaiKontrak"
          value={selesaiKontrak}
          onChange={(e) => setSelesaiKontrak(e.target.value)}
          required
        />

        <label htmlFor="jangkaWaktu">Jangka Waktu (Hari)</label>
        <textarea
          name="jangkaWaktu"
          id="jangkaWaktu"
          value={jangkaWaktu}
          readOnly
        ></textarea>

        <label htmlFor="nomorKontrak">Nomor Kontrak</label>
        <input type="text" name="nomorKontrak" id="nomorKontrak" required />

        <label htmlFor="npwpPenyedia">NPWP Penyedia</label>
        <input
          type="text"
          name="npwpPenyedia"
          id="npwpPenyedia"
          value={npwpPenyedia}
          onChange={(e) => setNpwpPenyedia(e.target.value)}
          placeholder="Tanpa tanda titik[.] dan tanda strip[-]"
          required
        />
        <button onClick={cekNpwp} type="button">
          Cek
        </button>

        <label htmlFor="namaPenyedia">Nama Penyedia</label>
        <input
          type="text"
          name="namaPenyedia"
          id="namaPenyedia"
          value={dataPenyedia.nama || ""}
          readOnly
        />

        <label htmlFor="alamatPenyedia">Alamat Penyedia</label>
        <input
          type="text"
          name="alamatPenyedia"
          id="alamatPenyedia"
          value={dataPenyedia.alamat || ""}
          readOnly
        />

        <label htmlFor="skp">Sisa Kemampuan Paket</label>
        <input
          type="number"
          name="skp"
          id="skp"
        />

        <label htmlFor="jenis">Kategori Pekerjaan</label>
        <select name="jenis" id="jenis">
          <option value="Kecil">Kecil</option>
          <option value="Non Kecil">Non Kecil</option>
        </select>

        <label htmlFor="nilaiKontrak">Nilai Kontrak</label>
        <input
          type="number"
          name="nilaiKontrak"
          id="nilaiKontrak"
          onChange={handleNilaiKontrak}
        />

        {/* Input Tenaga Ahli hanya muncul jika nilai kontrak >= 200 juta */}
        {nilaiKontrak >= 200000000 && (
          <>
            <label htmlFor="tenagaAhli">Tenaga Ahli</label>
            <input
              type="text"
              name="tenagaAhli"
              id="tenagaAhli"
              placeholder="NPWP atau Nama"
              onChange={(e) => handleInputTenagaAhli(e.target.value)}
              value={inputTenagaAhli}
            />
            <input type="hidden" name="idTenagaAhli" id="idTenagaAhli" value={idTenagaAhli} />
            <button onClick={cekTenagaAhli} type="button">
              Cek
            </button>
          </>
        )}

        <button type="reset" onClick={handleResetState}>
          Reset
        </button>
        <button type="submit">Tambah Data</button>
      </form>
    </div>
  );
}
