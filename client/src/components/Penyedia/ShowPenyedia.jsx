import Penyedia from "./Penyedia";
import { useState, useEffect } from "react";
import FormTambahPenyedia from "./FormTambahPenyedia";
import "./Penyedia.css";

export default function ShowPenyedia() {
  const [penyedias, setPenyedias] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = (e) => {
    e.preventDefault();
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    console.log("Closing form");
    setIsFormOpen(false);
  };

  const handlePenyediaAdded = async () => {
    try {
      const response = await fetch("http://localhost:5000/getPenyedia");
      const data = await response.json();
      setPenyedias(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handlePenyediaAdded();
  }, []);

  return (
    <div className="penyedia-container">
      <button onClick={handleOpenForm}>Tambah Penyedia</button>
      {penyedias.map((penyedia) => (
        <Penyedia key={penyedia._id} {...penyedia} />
      ))}

      {isFormOpen && (
        <FormTambahPenyedia
          onClose={handleCloseForm}
          onPenyediaAdded={handlePenyediaAdded}
        />
      )}
    </div>
  );
}