import Footer from "../Footer.tsx";
import Header from "./Header.tsx";
import Playlists from "./Playlists.tsx";
import LikedPlaylists from "./LikedPlaylists.tsx";
import SelectedPlaylist from "./SelectedPlaylist.tsx";
import {useState} from "react";

const MyMusic: React.FC = () => {
    const [isPlaylistSelected, setIsPlaylistSelected] = useState<boolean>(false)
    const [selectedPlaylistImage, setSelectedPlaylistImage] = useState<string>("")
    const [selectedPlaylistTitle, setSelectedPlaylistTitle] = useState<string>("")

    const onPlaylistSelect = (imagePath: string, playlistTitle: string): void => {
        setIsPlaylistSelected(true)
        setSelectedPlaylistTitle(playlistTitle)
        setSelectedPlaylistImage(imagePath)

        document.body.style.overflow = 'hidden'
    }

    const onPlaylistClosed = () => {
        setIsPlaylistSelected(false)
        document.body.style.overflow = ''
    }

    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <Playlists onPlaylistSelect={onPlaylistSelect}/>
            <LikedPlaylists />
            <Footer />
            {isPlaylistSelected &&
                <SelectedPlaylist isVisible={isPlaylistSelected}
                                  onPlaylistClosed={onPlaylistClosed}
                                  imagePath={selectedPlaylistImage}
                                  title={selectedPlaylistTitle}
                />}
        </div>
    );
};

export default MyMusic;