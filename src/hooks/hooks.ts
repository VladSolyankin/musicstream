import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getUserPlaylists} from "@firebase/index.js";
import {Playlist} from "@types";

export const useUserPlaylists = (setPlaylists: Dispatch<SetStateAction<Playlist[]>>, currentUserId: string | null) => {
	useEffect(() => {
		const fetchPlaylists = async () => {
			const response = await getUserPlaylists(currentUserId)
			const userPlaylists = response.map((newPlaylist: Playlist) => newPlaylist)
			setPlaylists(playlists => [...playlists, ...userPlaylists])
		}
		fetchPlaylists()
	}, [])
}

export const useAudio = (url) => {
	const [audio] = useState(new Audio(url))
	const [playing, setPlaying] = useState(false)

	const audioToggle = () => setPlaying(!playing)

	useEffect(() => {
		playing ? audio.play() : audio.pause()
	}, [playing])

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false))

		return () => {
			audio.removeEventListener('ended', () => setPlaying(false))
		}
	})

	return [audio, audioToggle]
}