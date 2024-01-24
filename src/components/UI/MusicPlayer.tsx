import React, {useState} from 'react';
import likedTracks from "../MyMusic/LikedTracks";
import {Track} from "@types/index";

const MusicPlayer = ({tracks}) => {
	const [playingTrack, setPlayingTrack] = useState<Track>(tracks[0])

	return (
		<div className="bg-white w-full h-32 fixed bottom-0">
			<img src={playingTrack.album.images[2].url} alt="" className="basis-1/8"/>
			<span className="text-center text-white basis-1/4">{playingTrack.name + " - " + playingTrack.artists[0].name}</span>
			<audio controls src={playingTrack.preview_url} className="bg-white basis-2/4"/>
		</div>
	);
};

export default MusicPlayer;