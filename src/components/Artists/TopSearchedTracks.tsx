import {Track} from "@types/index";
import PlaylistPicker from "./PlaylistPicker.tsx";
import {useState} from "react";
import {IoAddSharp} from "@react-icons/all-files/io5/IoAddSharp";

const TopSearchedTracks = ({tracks, onLikeClick, likedTracksIds}) => {
	const [isPickerOpen, setPickerOpen] = useState(false)
	const [selectedTrackId, setSelectedTrackId] = useState("")
	const [selectedTrackPreview, setSelectedTrackPreview] = useState("")
	const onPickerShow = (id: string, preview: string) => {
		setPickerOpen(true)
		setSelectedTrackId(id)
		setSelectedTrackPreview(preview)
	}

	const onPickerClose = () => setPickerOpen(false)
	return (
		<div className="my-5">
			<ol className="flex-col">
				{tracks.items.map((topTrack: Track) => (
					<li key={topTrack.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10 bg-gray-12">
						<img src={topTrack.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{topTrack.name + " - " + topTrack.artists[0].name}</span>
						{topTrack.preview_url && <audio controls src={topTrack.preview_url} className="bg-white basis-2/4"/> ||
							<a className="h-8 hover:font-bold text-center text-xl transform duration-150 basis-2/4" href={topTrack.external_urls.spotify}>Слушать на Spotify</a>
						}
						<button onClick={() => onLikeClick(topTrack.id)}>
							<img src={1 ? "src/assets/liked.png" : "src/assets/unliked.png"} alt="" className="w-8 h-7"/>
						</button>
						<button onClick={() => onPickerShow(topTrack.id, topTrack.preview_url)}>
							<IoAddSharp className="w-12 h-12"/>
						</button>
					</li>
				))}
			</ol>
			<PlaylistPicker isPickerOpen={isPickerOpen} onPickerClose={onPickerClose} trackId={selectedTrackId} previewUrl={selectedTrackPreview}/>
		</div>
	);
};

export default TopSearchedTracks;