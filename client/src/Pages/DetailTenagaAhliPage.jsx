import { useParams } from "react-router-dom";
import DetailTenagaAhli from "../components/TenagaAhli/DetailTenagaAhli";

export default function DetailTenagaAhliPage() {
    const { id } = useParams(); 
    return (
        <div>
            <DetailTenagaAhli _id={id} />
        </div>
    );
}