import { useNavigate } from 'react-router-dom';
export default function Paket() {
    const navigate = useNavigate();

    const handleTambahClick = () => {
        navigate('/TambahPaket');
    };
    return (
        <div>
            <button onClick={handleTambahClick}>Tambah</button>
        </div>
    )
}