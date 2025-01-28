import React from "react";
import { useNavigate } from "react-router-dom";

import { useTambahData } from "./logic/useTambahData";
import "./TambahData.css";

export default function TambahData({
  opdFromDetail,
  namaPekerjaanFromDetail,
  mulaiKontrakFromDetail,
  selesaiKontrakFromDetail,
  nilaiKontrakFromDetail,
  jangkaWaktuFromDetail,
  npwpPenyediaFromDetail,
  namaPenyediaFromDetail,
  alamatPenyediaFromDetail,
  jenisFromDetail,
  tenagaAhliFromDetail,
  isFromDetail,
}) {
  const navigate = useNavigate();
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
    errorSkpZero,
    setErrorSkpZero
  } = useTambahData();
  const handleClose = (e) => {
    e.preventDefault();
    setErrorSkpZero(false);
  }

  return (
    <div className="container">
      {isFromDetail ? <h2>Detail Paket</h2> : null}
      <form
        action="http://localhost:5000/TambahDataPaket"
        method="post"
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="opd">OPD</label>
          {isFromDetail ? (
            <input
              type="text"
              name="opdFormDetail"
              id="opdFormDetail"
              placeholder="Masukkan OPD"
              value={opdFromDetail}
              disabled
            />
          ) : (
            <>
              <select name="opd" id="opd">
                <option value="">Pilih OPD</option>
                {opd.map((opd) => (
                  <option key={opd._id} value={opd.namaOpd}>
                    {opd.namaOpd}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="namaPekerjaan">Nama Pekerjaan</label>
          {isFromDetail ? (
            <input
              type="text"
              name="namaPekerjaanFormDetail"
              id="namaPekerjaanFormDetail"
              placeholder="Masukkan Nama Pekerjaan"
              value={namaPekerjaanFromDetail}
              disabled
            />
          ) : (
            <input
              type="text"
              name="namaPekerjaan"
              id="namaPekerjaan"
              placeholder="Masukkan Nama Pekerjaan"
              required
            />
          )}
        </div>

        <div className="form-group">
          <div className="date-inputs">
            <div className="date-group">
              <label htmlFor="mulaiKontrak">Mulai Kontrak</label>
              {isFromDetail ? (
                <input
                  type="text"
                  name="mulaiKontrakFormDetail"
                  id="mulaiKontrakFormDetail"
                  value={mulaiKontrakFromDetail}
                  disabled
                />
              ) : (
                <input
                  type="date"
                  name="mulaiKontrak"
                  id="mulaiKontrak"
                  value={mulaiKontrak}
                  onChange={(e) => setMulaiKontrak(e.target.value)}
                  required
                  placeholder="Tanggal Mulai Kontrak"
                />
              )}
            </div>

            <div className="date-group">
              <label htmlFor="selesaiKontrak">Selesai Kontrak</label>
              {isFromDetail ? (
                <input
                  type="text"
                  name="selesaiKontrakFormDetail"
                  id="selesaiKontrakFormDetail"
                  value={selesaiKontrakFromDetail}
                  disabled
                />
              ) : (
                <input
                  type="date"
                  name="selesaiKontrak"
                  id="selesaiKontrak"
                  value={selesaiKontrak}
                  onChange={(e) => setSelesaiKontrak(e.target.value)}
                  required
                  placeholder="Tanggal Selesai Kontrak"
                />
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="jangkaWaktu">Jangka Waktu (Hari)</label>
          {isFromDetail ? (
            <input
              type="number"
              name="jangkaWaktuFormDetail"
              id="jangkaWaktuFormDetail"
              placeholder="Masukkan Jangka Waktu"
              value={jangkaWaktuFromDetail}
              disabled
            />
          ) : (
            <input
              type="number"
              name="jangkaWaktu"
              id="jangkaWaktu"
              placeholder="Masukkan Jangka Waktu"
              value={jangkaWaktu}
              onChange={(e) => handleNilaiKontrak(e.target.value)}
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="nomorKontrak">Nomor Kontrak</label>
          {isFromDetail ? (
            <input
              type="text"
              name="nomorKontrakFormDetail"
              id="nomorKontrakFormDetail"
              placeholder="Masukkan Nomor Kontrak"
              value={mulaiKontrakFromDetail}
              disabled
            />
          ) : (
            <input
              type="text"
              name="nomorKontrak"
              id="nomorKontrak"
              placeholder="Masukkan Nomor Kontrak"
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="npwpPenyedia">NPWP Penyedia</label>
          <div style={{ display: "flex", flex: 1 }}>
            {isFromDetail ? (
              <input
                type="text"
                name="npwpPenyediaFormDetail"
                id="npwpPenyediaFormDetail"
                placeholder="Masukkan NPWP Penyedia"
                value={npwpPenyediaFromDetail}
                disabled
              />
            ) : (
              <input
                type="text"
                name="npwpPenyedia"
                id="npwpPenyedia"
                placeholder="Masukkan NPWP Penyedia"
                value={npwpPenyedia}
                onChange={(e) => setNpwpPenyedia(e.target.value)}
                required
              />
            )}
            {isFromDetail ? null : (
              <button onClick={cekNpwp} type="button">
                Cek
              </button>
            )}
          </div>
        </div>
        {errorNpwp && <p className="errMsg">{errorNpwp}</p>}
        {errorSkpZero && <div className="errSkp0">
          <p>Skp Penyedia 0</p>
          <button onClick={handleClose}>Close</button>
          </div>}

        <div className="form-group">
          <label htmlFor="namaPenyedia">Nama Penyedia</label>
          {isFromDetail ? (
            <input
              type="text"
              name="namaPenyediaFormDetail"
              id="namaPenyediaFormDetail"
              placeholder="Masukkan Nama Penyedia"
              value={namaPenyediaFromDetail}
              disabled
            />
          ) : (
            <input
              type="text"
              name="namaPenyedia"
              id="namaPenyedia"
              value={dataPenyedia.nama || ""}
              readOnly
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="alamatPenyedia">Alamat Penyedia</label>
          {isFromDetail ? (
            <input
              type="text"
              name="alamatPenyediaFormDetail"
              id="alamatPenyediaFormDetail"
              placeholder="Masukkan Alamat Penyedia"
              value={alamatPenyediaFromDetail}
              disabled
            />
          ) : (
            <input
              type="text"
              name="alamatPenyedia"
              id="alamatPenyedia"
              value={dataPenyedia.alamat || ""}
              readOnly
            />
          )}
        </div>

        <div className="form-group">
          {isFromDetail ? null : (
            <>
              <label htmlFor="skp">Sisa Kemampuan Paket</label>
              <input
                type="number"
                name="skp"
                id="skp"
                placeholder="Masukkan sisa kemampuan paket"
              />
            </>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="jenis">Kategori Pekerjaan</label>
          {isFromDetail ? (
            <input
              type="text"
              name="jenis"
              id="jenis"
              placeholder="Masukkan kategori pekerjaan"
              value={jenisFromDetail}
              disabled
            />
          ) : (
            <select name="jenis" id="jenis">
              <option value="Kecil">Kecil</option>
              <option value="Non Kecil">Non Kecil</option>
            </select>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="nilaiKontrak">Nilai Kontrak</label>
          {isFromDetail ? (
            <input
              type="number"
              name="nilaiKontrak"
              id="nilaiKontrak"
              placeholder="Masukkan nilai kontrak"
              value={nilaiKontrakFromDetail}
              disabled
            />
          ) : (
            <input
              type="number"
              name="nilaiKontrak"
              id="nilaiKontrak"
              onChange={handleNilaiKontrak}
              placeholder="Masukkan nilai kontrak"
            />
          )}
        </div>

        {/* {nilaiKontrak >= 200000000 && (
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
        )} */}
        {isFromDetail ? (
          <div className="form-group">
            <label htmlFor="tenagaAhli">Tenaga Ahli</label>
            <input
              type="text"
              name="tenagaAhli"
              id="tenagaAhli"
              placeholder="NPWP atau Nama"
              value={tenagaAhliFromDetail}
              disabled
            />
          </div>
        ) : (
          nilaiKontrak >= 200000000 && (
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
          )
        )}

        <div className="button-group">
          {isFromDetail ? (
            <button type="button" onClick={() => navigate(-1)}>
              Kembali
            </button>
          ) : (
            <>
              <button type="reset" onClick={handleResetState}>
                Reset
              </button>
              <button type="submit">Tambah Data</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
