import React from 'react';
import Track from "../../interfaces";

interface LikedTrackListProps {
	likedTracksIds: Array<Track>,

}
const LikedTrackList: React.FC<LikedTrackListProps> = ({likedTracksIds, onLikeClick }) => {
	return (
		<div className="flex flex-col">
			{likedTracksIds.map(track => (
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
	);
};

export default LikedTrackList;