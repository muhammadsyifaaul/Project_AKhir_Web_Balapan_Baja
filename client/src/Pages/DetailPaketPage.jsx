import DetailPaket from "../components/Paket/DetailPaket";
import { useParams } from "react-router-dom";
export default function TambahPaketPage() {
    const { id } = useParams();

    return (
        <div>
            <DetailPaket idPaket={id} />
        </div>
    )
}