import axios from "axios";
import React, { useState, useEffect } from "react";

export default function TambahData() {
  const [mulaiKontrak, setMulaiKontrak] = useState("");
  const [selesaiKontrak, setSelesaiKontrak] = useState("");
  const [jangkaWaktu, setJangkaWaktu] = useState("");
  const [npwpPenyedia, setNpwpPenyedia] = useState("");
  const [opd, setOpd] = useState([]);
  const [nilaiKontrak, setNilaiKontrak] = useState(false);
  const [dataPenyedia, setDataPenyedia] = useState({});
  const [inputTenagaAhli, setInputTenagaAhli] = useState("");

  useEffect(() => {
    const fetchOpd = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getAllOpd");
        setOpd(response.data);
      } catch (error) {
        console.error("Error fetching OPD data:", error);
      }
    };
    fetchOpd();
  }, []);

  useEffect(() => {
    console.log("Updated dataPenyedia:", dataPenyedia);
  }, [dataPenyedia]);

  const hitungJangkaWaktu = (mulai, selesai) => {
    if (mulai && selesai) {
      const mulaiDate = new Date(mulai);
      const selesaiDate = new Date(selesai);
      const selisihHari = Math.ceil(
        (selesaiDate - mulaiDate) / (1000 * 60 * 60 * 24)
      );
      setJangkaWaktu(selisihHari > 0 ? selisihHari : "Invalid");
    } else {
      setJangkaWaktu("");
    }
  };

  useEffect(() => {
    hitungJangkaWaktu(mulaiKontrak, selesaiKontrak);
  }, [mulaiKontrak, selesaiKontrak]);

  const cekNpwp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/cekNpwp/${npwpPenyedia}`
      );
      setDataPenyedia(response.data);
    } catch (error) {
      console.error("Error fetching NPWP data:", error);
    }
  };
  const handleNilaiKontrak = (e) => {
    if (e.target.value >= 200000000) {
      setNilaiKontrak(true);
    } else {
      setNilaiKontrak(false);
    }
  };
  const handleInputTenagaAhli = (e) => {
    setInputTenagaAhli(e.target.value);
  };

  const cekTenagaAhli = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/cekTenagaAhli?tenagaAhli=${inputTenagaAhli}` 
      );
      console.log(response.data);
      setInputTenagaAhli(`${response.data.npwp} ${response.data.nama} `);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleResetState = () => {
    setMulaiKontrak("");
    setSelesaiKontrak("");
    setJangkaWaktu("");
    setNpwpPenyedia("");
    setDataPenyedia({});
    setNilaiKontrak(false);
    setInputTenagaAhli("");
  };

  return (
    <div>
      <form action="/TambahDataPaket" method="post">
        <label htmlFor="opd">OPD</label>
        <select name="opd" id="opd ">
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
        />

        <label htmlFor="selesaiKontrak">Selesai Kontrak</label>
        <input
          type="date"
          name="selesaiKontrak"
          id="selesaiKontrak"
          value={selesaiKontrak}
          onChange={(e) => setSelesaiKontrak(e.target.value)}
        />

        <label htmlFor="jangkaWaktu">Jangka Waktu (Hari)</label>
        <textarea name="jangkaWaktu" id="" value={jangkaWaktu}></textarea>

        <label htmlFor="nomorKontrak">Nomor Kontrak</label>
        <input type="text" name="nomorKontrak" id="nomorKontrak" />

        <label htmlFor="npwpPenyedia">NPWP Penyedia</label>
        <input
          type="text"
          name="npwpPenyedia"
          id="npwpPenyedia"
          value={npwpPenyedia}
          onChange={(e) => setNpwpPenyedia(e.target.value)}
          placeholder="Tanpa tanda titik[.] dan tanda strip[-]"
        />
        <button onClick={cekNpwp}>Cek</button>

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
        <input type="number" name="skp" id="skp" />

        <label htmlFor="jenis">Kategori Pekerjaan</label>
        <select name="jenis" id="">
          <option value="Kecil">Kecil</option>
          <option value="Non Kecil">Non Kecil</option>
        </select>

        <label htmlFor="jenis">Kategori Pekerjaan</label>

        <label htmlFor="nilaiKontrak">Nilai Kontrak</label>
        <input
          type="number"
          name="nilaiKontrak"
          id="nilaiKontrak"
          onChange={handleNilaiKontrak}
        />

        {nilaiKontrak ? (
          <>
            <label htmlFor="tenagaAhli">Tenaga Ahli</label>
            <input
              type="text"
              name="namaTenagaAhli"
              id="namaTenagaAhli"
              placeholder="NPWP atau Nama"
              onChange={handleInputTenagaAhli}
              value={inputTenagaAhli}
            />
            <button onClick={cekTenagaAhli}>Cek</button>
          </>
        ) : null}

        <button type="reset" onClick={handleResetState}>
          Reset
        </button>
        <button type="submit">Tambah Data</button>
      </form>
    </div>
  );
}
