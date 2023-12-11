import {useState} from 'react';
import SelectedPlaylist from "./SelectedPlaylist";
const Playlists = () => {
    const [isPlaylistSelected, setIsPlaylistSelected] = useState(false)
    const [playlists, setPlaylists] = useState([
        { id: 1, name: 'Название', imgPath: "src/assets/carousel1.jpg" },
        { id: 2, name: 'Название', imgPath: "src/assets/carousel2.jpg" },
        { id: 3, name: 'Название', imgPath: "src/assets/carousel3.jpg" },
        { id: 3, name: 'Название', imgPath: "src/assets/carousel1.jpg" },
        { id: 4, name: 'Название', imgPath: "src/assets/carousel2.jpg" },
        { id: 5, name: 'Название', imgPath: "src/assets/carousel3.jpg" },
        { id: 6, name: 'Название', imgPath: "src/assets/carousel1.jpg" },
    ]);

    const addPlaylist = () => {
        const newPlaylist = { id: playlists.length + 1, name: 'Новый плейлист', imgPath: "src/assets/carousel1.jpg" };
        setPlaylists([...playlists, newPlaylist]);
    };

    const onPlaylistSelect = () => {
        setIsPlaylistSelected(!isPlaylistSelected)
    }

    return (
        <div className="flex flex-col justify-center items-center border-2 border-white max-w-5xl mx-auto my-10 py-10 rounded-xl bg-gray-12">
            <div className="flex justify-between">
                <div className="relative">
                    <img src="src/assets/grid_icon.png" alt="Add new playlist button" className="w-8 h-8 mr-5"/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                Ваши плейлисты
                </h2>
                <div onClick={addPlaylist} className="relative left-80 bottom-5">
                    <img src="src/assets/add_playlist_button.png" alt="Add new playlist button" className="w-12 h-12"/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-20">
                {playlists.map(playlist => (
                    <div key={playlist.id}>
                        <div className="bg-gray-100 p-2 rounded flex items-center"

                        >
                            <img className="w-44 h-44 rounded mr-2 hover:scale-90 duration-150"
                                 src={playlist.imgPath} alt={playlist.name}
                                 onClick = {onPlaylistSelect}

                            />
                        </div>
                        <h2 className="text-white text-xl text-center">
                            {playlist.name}
                        </h2>
                    </div>
                ))}
            </div>

            {isPlaylistSelected && <SelectedPlaylist />}
        </div>
    );
};

export default Playlists;