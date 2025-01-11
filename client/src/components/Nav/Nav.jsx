import './Nav.css'
export default function Nav() {
    return (
        <nav className='nav'>
            <div className="nav-logo">
                <img src="logo.png" alt="Logo" />
            </div>
            <div className="nav-menu">
                <ul>
                    <li><a href="/data-paket">Pekerjaan</a></li>
                    <li><a href="/penyedia">Penyedia</a></li>
                    <li><a href="/tenaga-ahli">Tenaga Ahli</a></li>
                    <li><a href="/kelola-user">Kelola User</a></li>
                </ul>
            </div>
        </nav>
    )
}