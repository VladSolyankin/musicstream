import {useState} from "react";

const LikedPlaylists = () => {
    const [playlists] = useState([
        { id: 1, name: 'Название', imgPath: "src/assets/carousel1.jpg" },
        { id: 2, name: 'Название', imgPath: "src/assets/carousel2.jpg" },
        { id: 3, name: 'Название', imgPath: "src/assets/carousel3.jpg" },
    ]);

    return (
        <div className="flex flex-col justify-center items-center border-2 border-white max-w-5xl mx-auto my-10 py-10 rounded-xl bg-gray-12">
            <div className="flex justify-between">
                <div className="relative">
                    <img src="src/assets/liked.png" alt="Add new playlist button" className="w-8 h-8 mr-5"/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                    Вам понравилось
                </h2>
            </div>
            <div className="grid grid-cols-3 gap-20">
                {playlists.map(playlist => (
                    <div key={playlist.id}>
                        <div
                            className="bg-gray-100 p-2 rounded flex items-center"
                        >
                            <img className="w-44 h-44 rounded mr-2" src={playlist.imgPath} alt={playlist.name} />
                        </div>
                        <h2 className="text-white text-lg text-center">
                            {playlist.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LikedPlaylists;