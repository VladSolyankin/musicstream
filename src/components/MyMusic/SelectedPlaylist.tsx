import React, {useEffect, useState} from 'react';
import {deletePlaylist, deletePlaylistTrack, getPlaylistTracks} from "@firebase/index.js";
import {SelectedPlaylistProps, Track} from "@types";
import {userId} from "@constants";
import CustomPopover from "../UI/CustomPopover";
import SelectedPlaylistMenu from "../UI/SelectedPlaylistMenu.tsx";
import {nanoid} from "nanoid";
import '../../css/Sidemenu.css'
import {RxCrossCircled} from "react-icons/rx";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const SelectedPlaylist: React.FC<SelectedPlaylistProps> = ({isVisible, selectedPlaylist, onPlaylistClosed}) => {
	const [playlistTrackIds, setPlaylistTrackIds] = useState<object[]>([])
	const [playlistTracks, setPlaylistTracks] = useState<Track[]>([])
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const onMenuClosed = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()
		const menuClassList = event.currentTarget.parentElement?.classList;
		menuClassList?.replace("wrapper", "menu__closed")
		onPlaylistClosed()
	}

	const onDeleteTrack = (trackId: string) => {
		deletePlaylistTrack(userId, selectedPlaylist.id, trackId)
			.then(() => {
				setPlaylistTracks(tracks => tracks.filter(track => track.id !== trackId))
			})
	}

	const onDeletePlaylist = async () => {
		await deletePlaylist(userId, selectedPlaylist.id)
		onPlaylistClosed()
	}

	const onPopoverHandle = () => {
		setIsPopoverOpen(!isPopoverOpen)
	}

	useEffect(() => {
		const fetchPlaylistTrackIds = async () => {
			const trackIds = await getPlaylistTracks(userId, selectedPlaylist.id)
			setPlaylistTrackIds(trackIds)
		}
		fetchPlaylistTrackIds()
	}, [selectedPlaylist.id])

	useEffect(() => {
		const fetchPlaylistTrack = async () => {
			if (playlistTrackIds.length > 0) {
				const {tracks} = await fetch(`/getTracksByIds?ids=${playlistTrackIds.map(elem => elem.trackId).join('%2C')}`).then(res => res.json());
				setPlaylistTracks(tracks)
			}
		};
		fetchPlaylistTrack();
	}, [playlistTrackIds]);

	return (
		<div id="selectedPlaylist" className={isVisible ? "wrapper" : "menu__closed overscroll-contain"}>
			<div className="menu__background" onClick={onMenuClosed}></div>
			<div className="menu__opened overflow-y-auto relative">
				<div className="flex justify-between items-center p-5 flex-col sm:flex-row">
					<div className="flex flex-col justify-start">
						<span className="text-3xl font-jost font-bold">ПЛЕЙЛИСТ</span>
						<span className="text-2xl">{selectedPlaylist.title}</span>
						<CustomPopover isOpen={isPopoverOpen} onOpen={onPopoverHandle} content={<SelectedPlaylistMenu onDeletePlaylist={onDeletePlaylist}/>}>
							<ArrowDropDownCircleIcon className="my-3 hover:cursor-pointer hover:transition hover:duration-300 hover:-translate-y-[-3px]" fontSize="large" color="secondary"/>
						</CustomPopover>
					</div>
					<img src={selectedPlaylist.imagePath} alt="Playlist image" className="h-36 w-36 rounded-md"/>
				</div>

				<button className="absolute top-0 right-0 p-2" onClick={() => {}}>
					<RxCrossCircled className="basis-1/12 w-10 h-10 text-[#FF0000]"/>
				</button>

				<button className="flex justify-center min-w-full my-5 hover:cursor-default">
					<img src="/assets/playlist_play_button.png" alt="" className="w-28 h-28 hover:cursor-pointer transition duration-300 default:-translate-y-[-10px] hover:transition hover:duration-300 hover:-translate-y-[10px]"/>
				</button>


				<ul>
					{
						isVisible &&
						playlistTracks.map((track: Track, index) => {
							return <li key={nanoid()}
								className="border border-gray-12 p-4 mb-4 text-white flex items-center justify-between gap-10">
								<img src={track.album.images[2].url.length ? track.album.images[2].url : ""} alt="" className="basis-1/8"/>
								<span
									className="text-center text-[#000000] text-lg basis-1/4">{track.name + " - " + track.artists[0].name}</span>
								{playlistTrackIds[index].preview_url !== undefined && playlistTrackIds[index].preview_url !== null ? (
									<audio controls src={playlistTrackIds[index].preview_url} className="bg-white basis-2/4" />
								) : (
									<a href={track.external_urls.spotify} className="text-lg text-[#000000] font-bold text-center basis-2/4">
										Слушать на Spotify
									</a>
								)}
								<button onClick={() => onDeleteTrack(track.id)}>
									<RxCrossCircled className="basis-1/12 w-10 h-10 text-[#FF0000]"/>
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