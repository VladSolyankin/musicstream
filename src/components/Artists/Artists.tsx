import Header from "../Header";
import Footer from "../Footer";
import ArtistList from "./ArtistList.tsx";

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