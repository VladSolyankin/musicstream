import {Track} from "../../types";

const TopSearchedTracks = ({tracks, onLikeClick, likedTracksIds}) => {
	return (
		<div className="my-5">
			<ol className="flex-col">
				{tracks.items.map((topTrack: Track) => (
					<li key={topTrack.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10 bg-gray-12">
						<img src={topTrack.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{topTrack.name + " - " + topTrack.artists[0].name}</span>
						<audio controls src={topTrack.preview_url} className="bg-white basis-2/4"/>
						<button onClick={() => onLikeClick(topTrack.id)}>
							<img src={1 ? "src/assets/liked.png" : "src/assets/unliked.png"} alt="" className="w-8 h-7"/>
						</button>
						<button onClick={() => onLikeClick(topTrack.id)}>
							<img src="src/assets/add_track.png" alt="" className="w-8 h-7 bg-white"/>
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

export default TopSearchedTracks;