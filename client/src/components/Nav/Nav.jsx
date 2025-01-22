import './Nav.css'
export default function Nav({user = 'User'}) {
    return (
        <nav className='nav'>
            <div className="nav-logo">
                <img src="images\admin.png" alt="Logo" />
                <h1>{user}</h1>
            </div>
            <div className="nav-menu">
                <ul>
                    <li>
                        <a href="/DataPaket"> <img src="images/package.png"></img> Pekerjaan</a>
                    </li>
                    <li>
                        <a href="/Penyedia"><img src="images/provider.png"></img>Penyedia</a>
                    </li>
                    <li>
                        <a href="/TenagaAhli"><img src="images/rating.png"></img>Tenaga Ahli</a>
                    </li>
                    <li>
                        <a href="/KelolaUser"><img src="images/management.png"></img>Kelola User</a>
                    </li>
                </ul>
                {/* <ul>
                    <li><a href="/DataPaket">Pekerjaan</a></li>
                    <li><a href="/Penyedia">Penyedia</a></li>
                    <li><a href="/TenagaAhli">Tenaga Ahli</a></li>
                    <li><a href="/KelolaUser">Kelola User</a></li>
                </ul> */}
            </div>
        </nav>
    )
}