import {Track} from '@types'
import React, {useEffect, useState} from "react";
import {addLikedUserTrack, getUserLikedTracks} from "@firebase/index.js";
import {userId} from "@constants";
import {useMusicPlayerStore} from "@store";
import {MdPlayCircleFilled} from "react-icons/md";

const SearchedTracks = ({tracks, onLikeClick}) => {
	const [likedTracks, setLikedTracks] = useState<string[]>([])
	const {
		setPlayingTrack,
		setPlayerVisible,
		setPlayingTrackPreview,
		setTracksQueue,
		isTrackPlaying,
		setIsTrackPlaying,
		setPlayingTrackIndex,
		isPlayerVisible
	} = useMusicPlayerStore();

	useEffect(() => {
		fetchUserLikedTracks()
	}, [])

	const fetchUserLikedTracks = async () => {
		const userTracks = await getUserLikedTracks(userId)
		setLikedTracks(userTracks)
	}

	const addNewLikedTrack = async (trackId: string, preview: string) => {
		await addLikedUserTrack(userId, trackId, preview)
		fetchUserLikedTracks()
	}

	const onPlayClick = async (track, index) => {
		setIsTrackPlaying(!isTrackPlaying)
		setPlayerVisible(true)
		setPlayingTrack(track)
		setTracksQueue(tracks)
		setPlayingTrackIndex(index)
		setPlayingTrackPreview(track.preview_url)
	}

	return (
		<div className="my-5">
			<ol className="flex flex-col gap-5">
				{tracks.map((track: Track, index: number) => (
					<li key={track.id} className="border p-4 mb-4 text-white flex flex-col 2xl:flex-row items-center justify-between gap-20 bg-gray-12 rounded-xl">
						<img src={track.album.images[2].url} alt="" className="basis-1/8"/>
						<span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
						<div className="flex items-center justify-center basis-2/4">
							{track.preview_url ?
								<audio controls src={track.preview_url} onPlay={(e) => e.currentTarget.volume = 0.1}/>
								:
								<a href={track.external_urls.spotify} className="text-lg text-[white] font-bold text-center block">
									Слушать на Spotify
								</a>
							}
						</div>
						<button onClick={() => addNewLikedTrack(track.id, track.preview_url)}>
							<img src={likedTracks.some(likedTrack => likedTrack.id === track.id) ? "/assets/liked.png" : "/assets/unliked.png"} alt="" className="min-w-[12px] min-h-[8px] w-12 h-8"/>
						</button>
						<button onClick={() => onLikeClick(track.id)}>
							<img src="/assets/add_playlist_button.png" alt="" className="min-w-[12px] min-h-[8px] w-10 h-8 bg-[#000000]"/>
						</button>
					</li>
				))}
			</ol>
		</div>
	);
};

export default SearchedTracks;