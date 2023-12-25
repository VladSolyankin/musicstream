import React, {useEffect, useState} from 'react';
import useStore from "../../store/store.js";
import {getSearchedTracks} from "../../js/spotifyAPI";

const LikedTrackList: React.FC = () => {
	const {likedTracksIds} = useStore()
	const [likedTracks, setLikedTracks] = useState([])

	const onLikedTrackRender = async () => {
		const searchedLikedTracks = await getSearchedTracks(likedTracksIds)
		setLikedTracks(searchedLikedTracks)
	}

	useEffect(() => {
		onLikedTrackRender()
	}, [likedTracksIds])

	return (
		<div className="flex flex-col">
			{likedTracks.map(track => (
				<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10">
					<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
					<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
					<audio controls src={track.preview_url} className="bg-white basis-2/4"/>
					{/* Todo: make liked track deletion*/}
					<img onClick={() => console.log("")} src={""} alt="" className="w-8 h-7"/>
				</li>
			))}
		</div>
	);
};

export default LikedTrackList;