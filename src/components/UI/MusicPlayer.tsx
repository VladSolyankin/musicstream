import React from 'react';
import {useMusicPlayerStore} from "@store";

const MusicPlayer = () => {
	const {isPlayerVisible, setPlayerVisible} = useMusicPlayerStore()

	return (
		<div className={`bg-white w-full h-28 bottom-0 ${isPlayerVisible ? "fixed" : "hidden"}`}>
			{/*<img src={playingTrack.album.images[2].url} alt="" className="basis-1/8"/>*/}
			{/*<span className="text-center text-white basis-1/4">{playingTrack.name + " - " + playingTrack.artists[0].name}</span>*/}
			{/*<audio controls src={playingTrack.preview_url} className="bg-white basis-2/4"/>*/}
		</div>
	);
};

export default MusicPlayer;