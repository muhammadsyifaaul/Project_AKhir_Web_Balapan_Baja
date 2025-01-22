import { useState, useEffect } from "react";
import axios from "axios";

export const useTambahData = () => {
  const [mulaiKontrak, setMulaiKontrak] = useState("");
  const [selesaiKontrak, setSelesaiKontrak] = useState("");
  const [jangkaWaktu, setJangkaWaktu] = useState("");
  const [npwpPenyedia, setNpwpPenyedia] = useState("");
  const [opd, setOpd] = useState([]);
  const [nilaiKontrak, setNilaiKontrak] = useState(0);
  const [dataPenyedia, setDataPenyedia] = useState({});
  const [inputTenagaAhli, setInputTenagaAhli] = useState("");
  const [idTenagaAhli, setIdTenagaAhli] = useState("");
  const [errorNpwp, setErrorNpwp] = useState("");

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

  const cekNpwp = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/cekNpwp/${npwpPenyedia}`
      );
      if (!response.ok) {
        throw new Error("Penyedia tidak ditemukan");
      }
      const data = await response.json();
      setDataPenyedia(data);
      setErrorNpwp("");
    } catch (error) {
      setErrorNpwp(error.message);
      setDataPenyedia({});

      setTimeout(() => {
        setErrorNpwp("");
      }, 3000);
    }
  };

  const handleNilaiKontrak = (e) => {
    const nilai = e.target.value;
    setNilaiKontrak(nilai);
  };

  const handleInputTenagaAhli = (value) => {
    setInputTenagaAhli(value);
  };

  const cekTenagaAhli = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/cekTenagaAhli?tenagaAhli=${inputTenagaAhli}`
      );
      setInputTenagaAhli(`${response.data.npwp} ${response.data.nama}`);
      setIdTenagaAhli(response.data._id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    form.reset();
  };

  const handleResetState = () => {
    setMulaiKontrak("");
    setSelesaiKontrak("");
    setJangkaWaktu("");
    setNpwpPenyedia("");
    setDataPenyedia({});
    setNilaiKontrak(false);
    setInputTenagaAhli("");
    setIdTenagaAhli("");
  };

  return {
    mulaiKontrak,
    setMulaiKontrak,
    selesaiKontrak,
    setSelesaiKontrak,
    jangkaWaktu,
    npwpPenyedia,
    setNpwpPenyedia,
    opd,
    nilaiKontrak,
    handleNilaiKontrak,
    dataPenyedia,
    errorNpwp,
    cekNpwp,
    inputTenagaAhli,
    idTenagaAhli,
    handleInputTenagaAhli,
    cekTenagaAhli,
    handleResetState,
    handleFormSubmit,
  };
};
