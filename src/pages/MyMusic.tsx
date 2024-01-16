import Playlists from "../components/MyMusic/Playlists.tsx";
import LikedTracks from "../components/MyMusic/LikedTracks.tsx";
import SelectedPlaylist from "../components/MyMusic/SelectedPlaylist.tsx";
import {useState} from "react";
import PageLayout from "../components/Layout/PageLayout.tsx";

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
        <PageLayout>
            <Playlists onPlaylistSelect={onPlaylistSelect}/>
            <LikedTracks />
            {
                isPlaylistSelected &&
                <SelectedPlaylist isVisible={isPlaylistSelected}
                                  onPlaylistClosed={onPlaylistClosed}
                                  imagePath={selectedPlaylistImage}
                                  title={selectedPlaylistTitle}
                />
            }
        </PageLayout>
    );
};

export default MyMusic;