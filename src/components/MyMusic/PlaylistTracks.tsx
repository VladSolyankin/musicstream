import React from 'react';
import {Track} from "@types/index";

const PlaylistTracks = ({tracks}) => {
	return (
		<div className="my-5">
			<ol className="flex-col">
				{tracks.map((track: Track) => (
					<li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10 bg-gray-12">
						<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
						<audio controls src={track.preview_url} className="bg-white basis-2/4"/>
						<button onClick={() => 1}>
							<img src="src/assets/add_track.png" alt="" className="w-8 h-7 bg-white"/>
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};
export default PlaylistTracks;