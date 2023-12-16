import Footer from "../Footer.tsx";
import Header from "./Header.tsx";
import Playlists from "./Playlists.tsx";
import LikedPlaylists from "./LikedPlaylists.tsx";
import SelectedPlaylist from "./SelectedPlaylist.tsx";
import {useState} from "react";

const MyMusic = () => {
    const [isPlaylistSelected, setIsPlaylistSelected] = useState(false)
    const onPlaylistSelect = () => {
        setIsPlaylistSelected(!isPlaylistSelected)
        console.log('clicked')
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