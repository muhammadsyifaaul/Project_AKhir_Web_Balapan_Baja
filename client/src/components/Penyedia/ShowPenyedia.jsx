import Penyedia from "./Penyedia";
import { useState, useEffect } from "react";
export default function ShowPenyedia() {
  const [penyedias, setPenyedias] = useState([]);

  useEffect(() => {
    const fetchPenyedia = async () => {
      try {
        const response = await fetch("http://localhost:5000/getPenyedia");
        const data = await response.json();
        // console.log(data);
        setPenyedias(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPenyedia();
  }, []);
  console.log(penyedias);
  return (
    <div>
      {penyedias.map((penyedia, index) => (
        <Penyedia
          key={penyedia._id}
          no={index + 1} 
          {...penyedia}
        />
      ))}
    </div>
  );
}
