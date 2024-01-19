import React, {useEffect, useState} from 'react';
import '../../css/Sidemenu.css'
import {SelectedPlaylistProps, Track} from "@types/index";
import {nanoid} from "nanoid";
import {getPlaylistTracks} from "../../../firebase/index.cjs";
import { RxCrossCircled } from "react-icons/rx";

const SelectedPlaylist: React.FC<SelectedPlaylistProps> = ({isVisible, selectedPlaylist, onPlaylistClosed}) => {
	const [playlistTrackIds, setPlaylistTrackIds] = useState<object[]>([])
	const [playlistTracks, setPlaylistTracks] = useState<Track[]>([])

	const onMenuClosed = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		const menuClassList = event.currentTarget.parentElement?.classList;
		menuClassList?.replace("wrapper", "menu__closed")
		onPlaylistClosed()
	}

	const onDeleteTrack = () => { console.log("Playlist deleted")}

	useEffect(() => {
		const fetchPlaylistTrackIds = async () => {
			const trackIds = await getPlaylistTracks(localStorage.getItem("currentUserId"), selectedPlaylist.id)
			setPlaylistTrackIds(trackIds)
		}
		fetchPlaylistTrackIds()
	}, [selectedPlaylist.id])

	useEffect(() => {
		const fetchPlaylistTrack = async () => {
			if (playlistTrackIds.length > 0) {
				const {tracks} = await fetch(`/getTracksByIds?ids=${playlistTrackIds.map(elem => elem.trackIds).join('%2C')}`).then(res => res.json());
				setPlaylistTracks(tracks)
			}
		};
		fetchPlaylistTrack();
	}, [playlistTrackIds]);

	return (
		<div className={isVisible ? "wrapper" : "menu__closed overscroll-contain"}>
			<div className="menu__background" onClick={onMenuClosed}></div>
			<div className="menu__opened overflow-y-auto">
				<div className="flex justify-between">
					<div className="flex flex-col justify-start">
						<span className="text-3xl font-jost font-bold">ПЛЕЙЛИСТ</span>
						<span className="text-2xl">{selectedPlaylist.title}</span>
					</div>
					<img src={selectedPlaylist.imagePath} alt="Playlist image" className="h-36 w-36"/>
				</div>

				<button className="flex justify-center min-w-full my-5 hover:cursor-default">
					<img src="src/assets/playlist_play_button.png" alt="" className="w-28 h-28 hover:cursor-pointer"/>
				</button>

				<ul>
					{
						isVisible &&
						playlistTracks.map((track: Track, index) => {
							return <li key={nanoid()}
								className="border border-gray-12 p-4 mb-4 text-white flex items-center justify-between gap-10">
								<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
								<span
									className="text-center text-[#000000] text-lg basis-1/4">{track.name + " - " + track.artists[0].name}</span>
								{playlistTrackIds[index] !== undefined && playlistTrackIds[index].preview_url !== null ? (
									<audio controls src={playlistTrackIds[index].preview_url} className="bg-white basis-2/4" />
								) : (
									<a href={track.external_urls.spotify} className="text-lg text-[#000000] font-bold text-center basis-2/4">
										Слушать на Spotify
									</a>
								)}
								<button onClick={() => onDeleteTrack()}>
									<RxCrossCircled className="w-8 h-7 text-[#FF0000]" alt="Delete liked track icon"/>
								</button>
							</li>
						})
					}
				</ul>
			</div>
		</div>
	);
};

export default SelectedPlaylist;