import { useParams } from "react-router-dom";
import DetailTenagaAhli from "../components/TenagaAhli/DetailTenagaAhli";
import MainLayout from "../components/MainLayout";

export default function DetailTenagaAhliPage() {
    const { id } = useParams(); 
    return (
        <div>
            <MainLayout>
                <DetailTenagaAhli _id={id} />
            </MainLayout>
        </div>
    );
}