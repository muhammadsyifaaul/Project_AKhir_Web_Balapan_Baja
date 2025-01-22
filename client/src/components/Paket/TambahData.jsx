import React from "react";
import { useTambahData } from "./logic/useTambahData";
import "./TambahData.css";

export default function TambahData() {
  const {
    mulaiKontrak,
    setMulaiKontrak,
    selesaiKontrak,
    setSelesaiKontrak,
    jangkaWaktu,
    npwpPenyedia,
    setNpwpPenyedia,
    errorNpwp,
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
    <div className="container">
      <form
        action="http://localhost:5000/TambahDataPaket"
        method="post"
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="opd">OPD</label>
          <select name="opd" id="opd">
            <option value="">Pilih OPD</option>
            {opd.map((opd) => (
              <option key={opd._id} value={opd.namaOpd}>
                {opd.namaOpd}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="namaPekerjaan">Nama Pekerjaan</label>
          <textarea
            name="namaPekerjaan"
            id="namaPekerjaan"
            placeholder="Masukkan nama pekerjaan"
            rows="1"
          ></textarea>
        </div>

        <div className="form-group">
          <div className="date-inputs">
            <div className="date-group">
              <label>Mulai Kontrak</label>
              <input
                type="date"
                name="mulaiKontrak"
                id="mulaiKontrak"
                value={mulaiKontrak}
                onChange={(e) => setMulaiKontrak(e.target.value)}
                required
                placeholder="Tanggal Mulai Kontrak"
              />
            </div>

            <div className="date-group">
              <label>Selesai Kontrak</label>
              <input
                type="date"
                name="selesaiKontrak"
                id="selesaiKontrak"
                value={selesaiKontrak}
                onChange={(e) => setSelesaiKontrak(e.target.value)}
                required
                placeholder="Tanggal Selesai Kontrak"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="jangkaWaktu">Jangka Waktu (Hari)</label>
          <input
            type="text"
            name="jangkaWaktu"
            id="jangkaWaktu"
            value={jangkaWaktu}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="nomorKontrak">Nomor Kontrak</label>
          <input
            type="text"
            name="nomorKontrak"
            id="nomorKontrak"
            placeholder="Masukkan nomor kontrak"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="npwpPenyedia">NPWP Penyedia</label>
          <div style={{ display: "flex", flex: 1 }}>
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
          </div>
          
        </div>
        {errorNpwp && (
            <p className="errMsg">{errorNpwp}</p>
          )}

        <div className="form-group">
          <label htmlFor="namaPenyedia">Nama Penyedia</label>
          <input
            type="text"
            name="namaPenyedia"
            id="namaPenyedia"
            value={dataPenyedia.nama || ""}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="alamatPenyedia">Alamat Penyedia</label>
          <input
            type="text"
            name="alamatPenyedia"
            id="alamatPenyedia"
            value={dataPenyedia.alamat || ""}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="skp">Sisa Kemampuan Paket</label>
          <input
            type="number"
            name="skp"
            id="skp"
            placeholder="Masukkan sisa kemampuan paket"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jenis">Kategori Pekerjaan</label>
          <select name="jenis" id="jenis">
            <option value="Kecil">Kecil</option>
            <option value="Non Kecil">Non Kecil</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nilaiKontrak">Nilai Kontrak</label>
          <input
            type="number"
            name="nilaiKontrak"
            id="nilaiKontrak"
            onChange={handleNilaiKontrak}
            placeholder="Masukkan nilai kontrak"
          />
        </div>

        {nilaiKontrak >= 200000000 && (
          <div className="form-group">
            <label htmlFor="tenagaAhli">Tenaga Ahli</label>
            <div style={{ display: "flex", flex: 1 }}>
              <input
                type="text"
                name="tenagaAhli"
                id="tenagaAhli"
                placeholder="NPWP atau Nama"
                onChange={(e) => handleInputTenagaAhli(e.target.value)}
                value={inputTenagaAhli}
              />
              <input
                type="hidden"
                name="idTenagaAhli"
                id="idTenagaAhli"
                value={idTenagaAhli}
              />
              <button onClick={cekTenagaAhli} type="button">
                Cek
              </button>
            </div>
          </div>
        )}

        <div className="button-group">
          <button type="reset" onClick={handleResetState}>
            Reset
          </button>
          <button type="submit">Tambah Data</button>
        </div>
      </form>
    </div>
  );
}
