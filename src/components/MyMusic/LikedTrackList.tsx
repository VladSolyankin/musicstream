import React, {useEffect, useState} from 'react';
import {Track} from "@types/index.js";
import {deleteLikedTrack, getUserLikedTracks} from "../../api/firebase/index.js";
import {RxCrossCircled} from "react-icons/rx";
import {userId} from "@constants";
import {MdPlayCircle, MdPlayCircleFilled} from "react-icons/md";
import {useMusicPlayerStore} from "@store";
import {getTracksByIds} from "../../api/spotify";

const LikedTrackList: React.FC = () => {
	const [likedTracks, setLikedTracks] = useState([])
	const [firebaseTracks, setFirebaseTracks] = useState([])
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

	const onLikedTrackRender = async () => {
		const userLikedTrackIds = await getUserLikedTracks(userId);
		setFirebaseTracks(userLikedTrackIds)
		if (userLikedTrackIds.length) {
			const ids = userLikedTrackIds.map(track => track.id);
			const likedTracks = await getTracksByIds(ids.join('%2C'))
			console.log(likedTracks)
			setLikedTracks(likedTracks);
		} else {
			console.warn("No liked tracks");
		}
	};

	const onUnlikeTrack = async (trackId: string) => {
		await deleteLikedTrack(userId, trackId)
		setLikedTracks(likedTracks.filter((track) => track.id !== trackId))
	}

	useEffect(() => {
		onLikedTrackRender()
	}, [])

	const onPlayClick = async (track, index) => {
		setIsTrackPlaying(!isTrackPlaying)
		setPlayerVisible(true)
		setPlayingTrack(track)
		setTracksQueue(firebaseTracks)
		setPlayingTrackIndex(index)
		setPlayingTrackPreview(firebaseTracks[index].url)
	}

	return (
		<div className="flex flex-col gap-5">
			{likedTracks.length ? likedTracks?.map((track: Track, index) => (
				<li key={track.id} className="bg-white border p-4 mb-4 text-white flex items-center justify-between gap-10 rounded-2xl shadow-gray-600 shadow-playlist">
					<img src={track.album.images[2].url} alt="" className="basis-1/8 rounded-[50%] border-gray-12 border-2"/>
					<span className="font-bold text-center text-[#000000] basis-1/4">{track.name + " - " + track.artists[0].name}</span>
					{
						firebaseTracks[index].url ?
							<button onClick={() => onPlayClick(track, index)}>
								<MdPlayCircle style={{color:"black"}} className="w-12 h-12 basis-3/6" />
							</button>
							:
							<a href={track.external_urls.spotify} className=" text-lg text-[black] font-bold text-center block">
								Слушать на Spotify
							</a>
					}
					<button onClick={() => onUnlikeTrack(track.id)}>
						<RxCrossCircled className="w-8 h-7 text-[#FF0000]"/>
					</button>
				</li>
			)) : <></>}
		</div>
	);
};

export default LikedTrackList;