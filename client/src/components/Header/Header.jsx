import React, { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      fetch("http://localhost:5000/logout", {
        method: "GET",
        credentials: "include", // Kirim cookie bersama permintaan
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Logout berhasil");
            // Redirect ke halaman login
            window.location.href = "/Login";
          } else {
            console.error("Gagal logout");
          }
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat logout:", error);
        });
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const formattedDate = now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      setCurrentTime(`${formattedTime} | ${formattedDate}`);
    };

    updateCurrentTime(); // Set initial time
    const interval = setInterval(updateCurrentTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="header">
      <div className="left-logo">
        <img
          src="/images/logo_smg.webp"
          alt="Logo Balapan Baja"
          onError={(e) => (e.target.style.display = "none")} // Handle missing logo
        />
        <h2>BALAPAN BAJA</h2>
      </div>
      <div className="access-date">
        <p>Akses Terakhir: {currentTime}</p>
        <img
          src="/images/exit.png"
          alt="Ikon Keluar"
          className="logout-icon"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
