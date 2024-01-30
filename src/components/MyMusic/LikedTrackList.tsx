import React, {useEffect, useState} from 'react';
import {Track} from "@types/index.js";
import {deleteLikedTrack, getUserLikedTracks} from "../../api/firebase/index.js";
import {RxCrossCircled} from "react-icons/rx";
import {userId} from "@constants";

const LikedTrackList: React.FC = () => {
	const [likedTracks, setLikedTracks] = useState([])
	const onLikedTrackRender = async () => {
		const userLikedTrackIds = await getUserLikedTracks(userId)
		if (userLikedTrackIds.length) {
			const likedTracks = await fetch(`/getTracksByIds?ids=${userLikedTrackIds.join('%2C')}`)
				.then(res => res.json())
			setLikedTracks(likedTracks.tracks)
		}
		else {
			console.warn("No liked tracks")
		}
	}

	const onUnlikeTrack = async (trackId: string) => {
		await deleteLikedTrack(userId, trackId)
		setLikedTracks(likedTracks.filter((track: Track) => track.id !== trackId))
	}

	useEffect(() => {
		onLikedTrackRender()
	}, [])

	return (
		<div className="flex flex-col">
			{likedTracks.length && likedTracks.map((track: Track) => (
				<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10">
					<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
					<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
					<audio controls src={track.preview_url} className="bg-white basis-2/4"/>
					<button onClick={() => onUnlikeTrack(track.id)}>
						<RxCrossCircled className="w-8 h-7 text-[#FF0000]"/>
					</button>
				</li>
			))}
		</div>
	);
};

export default LikedTrackList;