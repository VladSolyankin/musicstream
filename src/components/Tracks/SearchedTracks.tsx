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

	const addNewLikedTrack = async (trackId: string) => {
		await addLikedUserTrack(userId, trackId)
		fetchUserLikedTracks()
	}

	return (
		<div className="my-5">
			<ol className="flex-col">
				{tracks.map((track: Track) => (
					<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10 bg-gray-12">
						<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
						{track.preview_url ?
							<audio controls src={track.preview_url} className="bg-black basis-2/4"/>
							:
							<a href={track.external_urls.spotify} className="text-lg text-[white] font-bold text-center basis-2/4">
								Слушать на Spotify
							</a>
						}
						<button onClick={() => addNewLikedTrack(track.id)}>
							<img src={likedTracks.includes(track.id) ? "/assets/liked.png" : "/assets/unliked.png"} alt="" className="w-8 h-7"/>
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