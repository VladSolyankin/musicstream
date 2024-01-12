import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import TracksList from "../components/Tracks/TracksList.tsx";

const Tracks = () => {
    return (
        <div>
            <Header />
            <TracksList />
            <Footer />
        </div>
    );
};

export default Tracks;