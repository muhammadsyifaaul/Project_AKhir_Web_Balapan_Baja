import "./Nav.css";

export default function Nav({ user = "User", notSuper}) {
    console.log(`notUser: ${notSuper}`);
  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src="images/admin.png" alt="Logo" />
        <h1>{user}</h1>
      </div>
      <div className="nav-menu">
        <ul>
          <li>
            <a href="/DataPaket">
              <img src="images/package.png" alt="package" /> Pekerjaan
            </a>
          </li>
          <li>
            <a href="/Penyedia">
              <img src="images/provider.png" alt="provider" /> Penyedia
            </a>
          </li>
          <li>
            <a href="/TenagaAhli">
              <img src="images/rating.png" alt="rating" /> Tenaga Ahli
            </a>
          </li>
          {!notSuper && (
            <li>
              <a href="/KelolaUser">
                <img src="images/management.png" alt="management" /> Kelola User
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
