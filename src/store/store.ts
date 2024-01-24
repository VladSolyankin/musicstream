import {create} from "zustand";

export const useStore = create((set) => ({
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

export const usePickerStore = create((set) => ({
	isPickerOpen: false,
	selectedTrackId: "",
	selectedTrackPreview: "",

	// Function to show the Picker
	showPicker: (id, preview) => set(() => ({
		isPickerOpen: true,
		selectedTrackId: id,
		selectedTrackPreview: preview,
	})),

	// Function to hide the Picker
	hidePicker: () => set((state) => ({
		isPickerOpen: false,
		selectedTrackId: "",
		selectedTrackPreview: "",
	})),
}));

export const useArtistDialogStore = create((set) => ({
	isDialogOpen: false,
	topArtistTracks: {},
	likedTrackIds: [],
	onLikeClick: () => {}, // Заглушка, замените на логику обработки клика на лайк

	openDialog: () => set({ isDialogOpen: true }),
	closeDialog: () => set({ isDialogOpen: false }),
	setTopArtistTracks: (tracks) => set({ topArtistTracks: tracks }),
	setLikedTrackIds: (likedIds) => set({ likedTrackIds: likedIds }),
}));

export default useStore