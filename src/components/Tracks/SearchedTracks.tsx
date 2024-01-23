import {Track} from '@types/index.ts'
import {useEffect, useState} from "react";
import {addLikedUserTrack, getUserLikedTracks} from "../../../firebase/index.cjs";


const SearchedTracks = ({tracks, onLikeClick}) => {
	const userId = localStorage.getItem("currentUserId")
	const [likedTracks, setLikedTracks] = useState<string[]>([])

	useEffect(() => {
		fetchUserLikedTracks()
	}, [])

	const fetchUserLikedTracks = async () => {
		const userTracks = await getUserLikedTracks(userId)
		setLikedTracks(userTracks)
	}

	const addNewLikedTrack = async (trackId: string) => {
		const newTrack = await addLikedUserTrack(userId, trackId)
		fetchUserLikedTracks()
	}

	return (
		<div className="my-5">
			<ol className="flex-col">
				{tracks.map((track: Track) => (
					<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10 bg-gray-12">
						<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
						<audio controls src={track.preview_url} className="bg-white basis-2/4"/>
						<button onClick={() => addNewLikedTrack(track.id)}>
							<img src={likedTracks.includes(track.id) ? "src/assets/liked.png" : "src/assets/unliked.png"} alt="" className="w-8 h-7"/>
						</button>
						<button onClick={() => onLikeClick(track.id)}>
							<img src="src/assets/add_track.png" alt="" className="w-8 h-7 bg-white"/>
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

export default SearchedTracks;