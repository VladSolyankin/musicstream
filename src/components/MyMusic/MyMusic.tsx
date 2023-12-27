import Footer from "../Footer.tsx";
import Playlists from "./Playlists.tsx";
import LikedTracks from "./LikedTracks.tsx";
import SelectedPlaylist from "./SelectedPlaylist.tsx";
import {useState} from "react";
import Header from "../Header";

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
        <div className="flex flex-col min-h-full">
            <Header />
            <Playlists onPlaylistSelect={onPlaylistSelect}/>
            <LikedTracks />
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