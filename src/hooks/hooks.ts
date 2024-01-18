import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {getStorageImage, getUserPlaylists} from "../../firebase/index.cjs";
import {Playlist} from "@types/index.ts";

export const useFirebaseStorage = (fileName) => {
	const url = useRef("")

	useEffect(() => {
		const getImageUrl = async () => {
			url.current = await getStorageImage(fileName)
		}
		getImageUrl().then(() => console.log(`${url.current} fetched`)).catch(err => console.log(err.message))

	}, [fileName])

	return url.current

}

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