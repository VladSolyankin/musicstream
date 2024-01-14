import {create} from "zustand";

const useStore = create((set) => ({
	query: '',
	page: 0,
	tracks: [],
	isFunctionExecuted: false,
	likedTracksIds: [],
	setQuery: (query) => set({ query }),
	setPage: (page) => set({ page }),
	setTracks: (tracks) => set({ tracks }),
	setIsFunctionExecuted: (isFunctionExecuted) => set({ isFunctionExecuted }),
	setLikedTracksIds: (likedTracksIds) => set({ likedTracksIds }),
	currentUser: ''
}));

export default useStore