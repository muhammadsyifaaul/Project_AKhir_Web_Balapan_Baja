import { useState, useEffect } from "react";
import axios from "axios";

export const useTambahData = () => {
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
      const response = await axios.get(
        `http://localhost:5000/cekNpwp/${npwpPenyedia}`
      );
      if (response.data.skp <= 0) {
        alert("Insufficient SKP for the provider. Form will be cleared.");
        handleResetState();
        return;
      }
      setDataPenyedia(response.data);
    } catch (error) {
      console.error("Error fetching NPWP data:", error);
      alert("Failed to fetch NPWP data. Please try again.");
    }
  };

  const handleNilaiKontrak = (value) => {
    setNilaiKontrak(value >= 200000000);
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
    cekNpwp,
    inputTenagaAhli,
    handleInputTenagaAhli,
    cekTenagaAhli,
    handleResetState,
    handleFormSubmit
  };
};
