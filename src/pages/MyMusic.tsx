import Playlists from "../components/MyMusic/Playlists.tsx";
import LikedTracks from "../components/MyMusic/LikedTracks.tsx";
import SelectedPlaylist from "../components/MyMusic/SelectedPlaylist.tsx";
import {useState} from "react";
import PageLayout from "../components/Layout/PageLayout.tsx";
import {Playlist} from "@types";

const MyMusic: React.FC = () => {
    const [isPlaylistSelected, setIsPlaylistSelected] = useState<boolean>(false)
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist>({})

    const onPlaylistSelect = (playlist: Playlist) => {
        setIsPlaylistSelected(true)
        setSelectedPlaylist(playlist)

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
                                  selectedPlaylist={selectedPlaylist}
                />
            }
        </PageLayout>
    );
};

export default MyMusic;