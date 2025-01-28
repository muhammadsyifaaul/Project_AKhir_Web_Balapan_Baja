import ShowTenagaAhli from "../components/TenagaAhli/ShowTenagaAhli";
import MainLayoout from "../components/MainLayout";

export default function TenagaAhliPage({notSuper}) {
    return (
        <MainLayoout>
            <ShowTenagaAhli notSuper={notSuper} />
        </MainLayoout>
    )
}