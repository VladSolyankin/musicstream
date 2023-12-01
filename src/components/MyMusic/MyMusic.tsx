import Footer from "../Footer.tsx";
import Header from "./Header.tsx";
import Playlists from "./Playlists.tsx";
import LikedPlaylists from "./LikedPlaylists.tsx";

const MyMusic = () => {
    return (
        <div>
            <Header />
            <Playlists />
            <LikedPlaylists />
            <Footer />
        </div>
    );
};

export default MyMusic;