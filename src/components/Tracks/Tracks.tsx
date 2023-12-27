import Header from "../Header.tsx";
import Footer from "../Footer.tsx";
import TracksList from "./TracksList.tsx";

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