import { useParams } from "react-router-dom";
import DetailTenagaAhli from "../components/TenagaAhli/DetailTenagaAhli";

export default function DetailTenagaAhliPage() {
    const { _id } = useParams(); 
    return (
        <div>
            <DetailTenagaAhli _id={_id} />
        </div>
    );
}