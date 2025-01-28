import Header from "./Header/Header";
import './MainLayout.css';
import ShowNav from "./Nav/ShowNav";

export default function MainContainer({ children }) {
    return (
        <>
            <Header />
            <main className="main-container">
                <ShowNav />
                {children}
            </main>
        </>
    );
}
