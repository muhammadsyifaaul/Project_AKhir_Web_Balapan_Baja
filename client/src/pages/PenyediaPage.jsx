import MainLayout from "../components/MainLayout"
import ShowPenyedia from "../components/Penyedia/ShowPenyedia"
export default function PenyediaPage({notSuper}) {
    return (
        <MainLayout>
            <ShowPenyedia notSuper={notSuper} />
        </MainLayout>
    )
}