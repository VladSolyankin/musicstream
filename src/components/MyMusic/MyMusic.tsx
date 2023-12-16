import Footer from "../Footer.tsx";
import Header from "./Header.tsx";
import Playlists from "./Playlists.tsx";
import LikedPlaylists from "./LikedPlaylists.tsx";
import SelectedPlaylist from "./SelectedPlaylist.tsx";
import {useState} from "react";

const MyMusic: React.FC = () => {
    const [isPlaylistSelected, setIsPlaylistSelected] = useState<boolean>(false)
    const onPlaylistSelect = (): void => {
        setIsPlaylistSelected(!isPlaylistSelected)
    }
    return (
        <div>
            <Header />
            <Playlists onPlaylistSelect={onPlaylistSelect}/>
            <LikedPlaylists />
            <Footer />
            {isPlaylistSelected && <SelectedPlaylist isVisible={isPlaylistSelected}/>}
        </div>
    );
};

export default MyMusic;