import React, { useState, useEffect } from "react";
import TenagaAhli from "./TenagaAhli";
import axios from "axios";
export default function ShowTenagaAhli() {
  const [tenagaAhli, setTenagaAhli] = useState([]);

  useEffect(() => {
    const fetchTenagaAhli = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getTenagaAhli");
        setTenagaAhli(response.data);
      } catch (error) {
        console.error("Error fetching tenaga ahli:", error);
      }
    };

    fetchTenagaAhli();
  }, []);

  return (
    <div>
      {tenagaAhli.map((tenagaAhli, index) => (
        <TenagaAhli
          key={tenagaAhli._id}
          no={index + 1}
          {...tenagaAhli}
        />
      ))}
    </div>
  );
}