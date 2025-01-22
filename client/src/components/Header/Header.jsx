import React, { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
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
  }, []);

  return (
    <div className="header">
      <div className="left-logo">
        <img src="/images/logo_smg.webp" alt="Logo" />
        <h2>BALAPAN BAJA</h2>
      </div>
      <div className="access-date">
        <p>Akses Terakhir: {currentTime}</p>
        <img src="/images/exit.png" alt="Icon exit" />
      </div>
    </div>
  );
}
