import React, {useEffect, useRef, useState} from 'react';
import {useMusicPlayerStore} from "@store";
import {RxCrossCircled} from "react-icons/rx";
import {Track} from "@types";
import {MdSkipNext, MdSkipPrevious} from "react-icons/md";

const MusicPlayer = () => {
	const {
		isPlayerVisible,
		setPlayerVisible,
		tracksQueue,
		playingTrack,
		playingTrackPreview,
		setPlayingTrack,
		isTrackPlaying,
		setIsTrackPlaying,
		playingTrackIndex,
		setPlayingTrackIndex,
	} = useMusicPlayerStore();
	const [track, setTrack] = useState<Track>(playingTrack);
	const audioRef = useRef<HTMLAudioElement>(new Audio(""));

	useEffect(() => {
		setTrack(playingTrack);
	}, [playingTrack]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.1
			if (isTrackPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play().then(r => r);
			}
		}
	}, [isTrackPlaying]);

	useEffect(() => {
		if (audioRef.current) audioRef.current.addEventListener('ended', playNextTrack);
		return () => {
			if (audioRef.current) audioRef.current.removeEventListener('ended', playNextTrack);
		};
	});

	const onPlayerClose = () => setPlayerVisible(false);

	const playNextTrack = () => {
		const nextIndex = (playingTrackIndex + 1) % tracksQueue.length;
		setPlayingTrackIndex(nextIndex)
		setTrack(tracksQueue[nextIndex]);
		setPlayingTrack(tracksQueue[nextIndex]);
	};

	const playPreviousTrack = () => {
		const previousIndex = (playingTrackIndex - 1 + tracksQueue.length) % tracksQueue.length;
		setPlayingTrackIndex(previousIndex)
		setTrack(tracksQueue[previousIndex]);
		setPlayingTrack(tracksQueue[previousIndex]);
	};

	const onPlayPauseClick = () => {
		setIsTrackPlaying(!isTrackPlaying);
		setPlayingTrack(tracksQueue[playingTrackIndex]);
	};

	return (
		isPlayerVisible && track ? (
			<div className={`flex items-center justify-center bg-white w-full h-24 bottom-0 ${isPlayerVisible ? "fixed" : "hidden"}`}>
				<div className="flex justify-center items-center basis-1/6">
					<MdSkipPrevious className="w-12 h-12 cursor-pointer" onClick={playPreviousTrack} />
					<img src={track.album?.images[2]?.url || "assets/disco.svg"} alt="Playing track image" className="basis-1/8 w-14 h-14" />
					<MdSkipNext className="w-12 h-12 cursor-pointer" onClick={playNextTrack} />
				</div>
				<span className="font-bold text-lg text-center basis-1/4">{track.name}</span>
				<audio ref={audioRef} id="music-player" controls src={(playingTrackPreview && playingTrackPreview[playingTrackIndex] && playingTrackPreview[playingTrackIndex].preview_url) || (track && track.src) || (tracksQueue[playingTrackIndex].url)} className="bg-white" autoPlay />
				<button onClick={onPlayerClose} className="absolute top-0 right-0 p-2">
					<RxCrossCircled className="basis-1/12 w-8 h-8 text-[#FF0000]" />
				</button>
			</div>
		) : (
			<></>
		)
	);
};

export default MusicPlayer;
