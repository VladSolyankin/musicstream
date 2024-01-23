import React, {useEffect, useState} from 'react';
import useStore from "../../store/store.js";
import {Track} from "@types/index.ts";
import {getUserLikedTracks} from "../../../firebase/index.cjs";

const LikedTrackList: React.FC = () => {
	const userId = localStorage.getItem("currentUserId")
	const [likedTracks, setLikedTracks] = useState([])
	const onLikedTrackRender = async () => {
		const userLikedTrackIds = await getUserLikedTracks(userId)
		const likedTracks = await fetch(`/getTracksByIds?ids=${userLikedTrackIds.join('%2C')}`)
			.then(res => res.json())
		setLikedTracks(likedTracks.tracks)
	}

	const onUnlikeTrack = (id: string) => {
		setLikedTracks(likedTracks.filter((track: Track) => track.id !== id))
	}

	useEffect(() => {
		onLikedTrackRender()
	}, [])

	return (
		<div className="flex flex-col">
			{likedTracks.map((track: Track) => (
				<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10">
					<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
					<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
					<audio controls src={track.preview_url} className="bg-white basis-2/4"/>
					<button onClick={() => onUnlikeTrack(track.id)}>
						<img className="w-8 h-7" src="src/assets/unlike.png" alt="Delete liked track icon"/>
					</button>
				</li>
			))}
		</div>
	);
};

export default LikedTrackList;