import Header from "../components/Header";
import Footer from "../components/Footer";
import ArtistList from "../components/Artists/ArtistList.tsx";

const Artists = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <ArtistList />
            <Footer />
        </div>
    );
};

export default Artists;