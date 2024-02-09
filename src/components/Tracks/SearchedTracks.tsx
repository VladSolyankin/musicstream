import React, { useEffect, useState } from "react";
import { addLikedUserTrack, getUserLikedTracks } from "@firebase/index.js";
import { userId } from "@constants";
import { useMusicPlayerStore } from "@store";
import PlaylistPicker from "../Artists/PlaylistPicker.tsx";

const SearchedTracks = ({ tracks, onLikeClick }) => {
	const [likedTracks, setLikedTracks] = useState<string[] | undefined>();
	const [isPickerOpen, setPickerOpen] = useState(false);
	const [selectedTrackId, setSelectedTrackId] = useState("");
	const [selectedTrackPreview, setSelectedTrackPreview] = useState("");
	const [isAudioPlaying, setIsAudioPlaying] = useState(false);
	const [currentAudioElement, setCurrentAudioElement] = useState<HTMLAudioElement | null>(null);

	const {
		setPlayingTrack,
		setPlayerVisible,
		setPlayingTrackPreview,
		setTracksQueue,
		setIsTrackPlaying,
		setPlayingTrackIndex,
		isTrackPlaying,
		isPlayerVisible
	} = useMusicPlayerStore();

	useEffect(() => {
		fetchUserLikedTracks();
	}, []);

	const fetchUserLikedTracks = async () => {
		const userTracks = await getUserLikedTracks(userId);
		console.log(userTracks)
		setLikedTracks(userTracks);
	};

	const addNewLikedTrack = async (trackId: string, preview: string) => {
		await addLikedUserTrack(userId, trackId, preview)
		await fetchUserLikedTracks()
	}

	const addNewPlaylistTrackHandler = async (trackId, previewUrl) => {
		setSelectedTrackId(trackId);
		setSelectedTrackPreview(previewUrl);
		setPickerOpen(true);
	};

	const onPlayClick = async (track, index) => {
		setIsTrackPlaying(!isTrackPlaying);
		setPlayerVisible(true);
		setPlayingTrack(track);
		setTracksQueue(tracks);
		setPlayingTrackIndex(index);
		setPlayingTrackPreview(track.preview_url);
	};

	const onPickerClose = () => {
		setPickerOpen(false);
	};

	const handleAudioPlay = (audioElement: HTMLAudioElement) => {
		// Остановка предыдущего аудио, если есть
		if (currentAudioElement && currentAudioElement !== audioElement) {
			currentAudioElement.pause();
			currentAudioElement.currentTime = 0;
		}
		// Установка нового текущего аудио
		setCurrentAudioElement(audioElement);
	};

	return (
		<div className="my-5">
			<ol className="flex flex-col gap-5">
				{tracks.map((track, index) => (
					<li key={track.id} className="border p-4 mb-4 text-white flex flex-col 2xl:flex-row items-center justify-between gap-20 bg-gray-12 rounded-xl">
						<img src={track.album.images[2].url} alt="" className="basis-1/8" />
						<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
						<div className="flex items-center justify-center basis-2/4">
							{track.preview_url ?
								<audio
									controls
									src={track.preview_url}
									onPlay={(e) => {
										e.currentTarget.volume = 0.3;
										setIsAudioPlaying(true);
										handleAudioPlay(e.currentTarget);
									}}
									onPause={() => setIsAudioPlaying(false)}
									style={{ maxWidth: "100%", maxHeight: "80px" }}
								/>
								:
								<a href={track.external_urls.spotify} className="text-lg text-[white] font-bold text-center block">
									Слушать на Spotify
								</a>
							}
						</div>
						<div className="flex items-center gap-5 flex-grow basis-[100px]"> {/* Добавленные стили */}

							<button onClick={() => addNewLikedTrack(track.id, track.preview_url)}>
								<img src={likedTracks?.some(likedTrack => likedTrack.id === track.id) ? "/assets/liked.png" : "/assets/unliked.png"} alt="" className="min-w-[12px] min-h-[8px] w-12 h-8" />
							</button>

							<button onClick={() => addNewPlaylistTrackHandler(track.id, track.preview_url)}>
								<img src="/assets/add_playlist_button.png" alt="" className="min-w-[12px] min-h-[8px] w-10 h-8 bg-[#000000]" />
							</button>
						</div>
					</li>
				))}
			</ol>
			<PlaylistPicker
				isPickerOpen={isPickerOpen}
				onPickerClose={onPickerClose}
				trackId={selectedTrackId}
				previewUrl={selectedTrackPreview}
			/>
		</div>
	);
};

export default SearchedTracks;
