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
	hidePicker: () => set(() => ({
		isPickerOpen: false,
		selectedTrackId: "",
		selectedTrackPreview: "",
	})),
}));

export const useArtistDialogStore = create((set) => ({
	isDialogOpen: false,
	topArtistTracks: {},
	likedTrackIds: [],
	onLikeClick: () => {},

	openDialog: () => set({ isDialogOpen: true }),
	closeDialog: () => set({ isDialogOpen: false }),
	setTopArtistTracks: (tracks) => set({ topArtistTracks: tracks }),
	setLikedTrackIds: (likedIds) => set({ likedTrackIds: likedIds }),
}));

export const usePlaylistStore = create((set) => ({
	playlists: [],
	setPlaylists: (playlists) => set({ playlists }),
	newPlaylistTitle: '',
	setNewPlaylistTitle: (title) => set({ newPlaylistTitle: title }),
	previewImage: null,
	setPreviewImage: (image) => set({ previewImage: image }),
	isDialogOpen: false,
	setIsDialogOpen: (isOpen) => set({ isDialogOpen: isOpen }),
}));

export const useMusicPlayerStore = create((set) => ({
	isPlayerVisible: false,
	setPlayerVisible: (isVisible) => set({isPlayerVisible: isVisible}),
	tracksQueue: [],
	setTracksQueue: (tracks) => set({tracks})
}))

export default useStore
