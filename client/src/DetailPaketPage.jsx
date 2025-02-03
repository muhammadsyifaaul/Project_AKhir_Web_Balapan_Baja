import DetailPaket from "./components/Paket/DetailPaket";
import MainLayout from "./components/MainLayout";
import { useParams } from "react-router-dom";
export default function TambahPaketPage() {
    const { id } = useParams();

    return (
        <div>
            <MainLayout>
            <DetailPaket idPaket={id} />
            </MainLayout>
        </div>
    )
}