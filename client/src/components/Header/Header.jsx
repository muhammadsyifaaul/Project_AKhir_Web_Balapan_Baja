import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <div class="left-logo">
        <img src="/images/logo_smg.webp" alt="Logo" />
        <h2>BALAPAN BAJA</h2>
      </div>
      <div class="access-date">
        <p>Akses Terakhir: 15:30:46 | 23 Januari 2023</p>
        <img src="icon.png" alt="Icon" />
      </div>
    </div>
  );
}
