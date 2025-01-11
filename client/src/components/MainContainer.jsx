import Header from "./Header/Header";
import Nav from "./Nav/Nav";
import './MainContainer.css';

export default function MainContainer({children}) {
    return(
        <>
        <Header />
        <main className="main-container">
            <Nav />
            {children}
        </main>
        </>
    )
}