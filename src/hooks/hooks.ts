import {Dispatch, SetStateAction, useEffect} from "react";
import {getUserPlaylists} from "../../firebase/index.cjs";
import {Playlist} from "@types/index.ts";

export const useFirebaseStorage = () => {
	// const url = useRef("")
	//
	// useEffect(() => {
	// 	const getTracksUrls = async () => {
	// 		url.current = await getTracksFromStorage(userId)[0]
	// 	}
	// 	getTracksUrls()
	// 		.then(() => console.log(`${url.current} fetched`))
	// 		.catch(err => console.log(err.message))
	// }, [])
	//
	// return url.current
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