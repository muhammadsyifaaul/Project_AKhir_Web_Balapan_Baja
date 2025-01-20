import React, { useState, useEffect } from "react";
import TenagaAhli from "./TenagaAhli";
import FormTambahTenagaAhli from "./FormTambahTenagaAhli";
import axios from "axios";
import "./TenagaAhli.css";

export default function ShowTenagaAhli() {
  const [tenagaAhli, setTenagaAhli] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTenagaAhli = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getTenagaAhli");
      setTenagaAhli(response.data);
    } catch (error) {
      console.error("Error fetching tenaga ahli:", error);
    }
  };

  useEffect(() => {
    fetchTenagaAhli();
  }, []);

  return (
    <div>
      <button onClick={() => setIsFormOpen(true)}>Tambah Tenaga Ahli</button>

      {isFormOpen && (
        <FormTambahTenagaAhli
          onClose={() => setIsFormOpen(false)}
          onPenyediaAdded={fetchTenagaAhli}
        />
      )}

      {tenagaAhli.map((tenagaAhli, index) => (
        <TenagaAhli key={tenagaAhli._id} no={index + 1} {...tenagaAhli} />
      ))}
    </div>
  );
}
