import {Track} from '@types'
import React, {useEffect, useState} from "react";
import {addLikedUserTrack, getUserLikedTracks} from "@firebase/index.js";
import {userId} from "@constants";

const SearchedTracks = ({tracks, onLikeClick}) => {
	const [likedTracks, setLikedTracks] = useState<string[]>([])

	useEffect(() => {
		fetchUserLikedTracks()
	}, [])

	const fetchUserLikedTracks = async () => {
		const userTracks = await getUserLikedTracks(userId)
		setLikedTracks(userTracks)
	}

	const addNewLikedTrack = async (trackId: string, preview: string) => {
		await addLikedUserTrack(userId, trackId, preview)
		fetchUserLikedTracks()
	}

	return (
		<div className="my-5">
			<ol className="flex flex-col gap-5">
				{tracks.map((track: Track) => (
					<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-12 bg-gray-12 rounded-xl">
						<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
						{track.preview_url ?
							<audio controls src={track.preview_url} className="bg-black basis-2/4"/>
							:
							<a href={track.external_urls.spotify} className="text-lg text-[white] font-bold text-center basis-2/4">
								Слушать на Spotify
							</a>
						}
						<button onClick={() => addNewLikedTrack(track.id, track.preview_url)}>
							<img src={likedTracks.some(likedTrack => likedTrack.id === track.id) ? "/assets/liked.png" : "/assets/unliked.png"} alt="" className="w-8 h-7"/>
						</button>
						<button onClick={() => onLikeClick(track.id)}>
							<img src="/assets/add_playlist_button.png" alt="" className="w-8 h-7 bg-[#000000]"/>
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

export default SearchedTracks;