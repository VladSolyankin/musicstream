import {Dispatch, SetStateAction, useEffect} from "react";
import {getUserPlaylists} from "../api/firebase/index.js";
import {Playlist} from "@types/index.ts";

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