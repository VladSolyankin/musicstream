import React from "react";

const LikedTracks = ({onLikeClick, likedTracksIds, likedTracks}) => {

    return (
        <div className="flex flex-col justify-center items-center border-2 border-white max-w-5xl mx-auto my-10 py-10 rounded-xl bg-gray-12 p-10">
            <div className="flex justify-between">
                <div className="relative">
                    <img src="src/assets/liked.png" alt="Add new playlist button" className="w-8 h-8 mr-5"/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                    Вам понравилось
                </h2>
            </div>
            <div className="flex flex-col">
                {likedTracks.map(track => (
                    <li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10">
                        <img src={track.album.images[2].url} alt="" className="basis-1/8"/>
                        <span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
                        <audio controls src={track.preview_url} className="bg-white basis-2/4"/>
                        <img onClick={() => onLikeClick(track.id)} src={
                            likedTracksIds.includes(track.id) ? "src/assets/liked.png" : "src/assets/unliked.png"
                        } alt="" className="w-8 h-7"/>
                    </li>
                ))}
            </div>
        </div>
    );
};

export default LikedTracks;