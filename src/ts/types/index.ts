import React, {ChangeEvent, Dispatch, SetStateAction} from "react";

export type Track = {
    id: string,
    album: Album,
    name: string,
    message: string,
    preview_url: string,
    artists: Array<TrackArtist>
}

interface TrackArtist {
    name: string
}

interface Album {
    images: Array<Image>
}

interface Image {
    url: string
}

export type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export type Playlist = {
    id: string,
    title: string,
    imagePath: string
}

export type PlaylistsProps = {
    onPlaylistSelect: (playlist: Playlist) => void;
}

export type Artist = {
    letter?: string,
    artists?: any,
    name: string,
    image: string
}

export type PlaylistItemProps = {
    playlist: Playlist,
    onPlaylistSelect: (playlist: Playlist) => void,
}

export type PickerPlaylistItemProps = {
    playlist: Playlist,
    onPlaylistSelect: () => void,
    trackId: string,
    previewUrl: string
}

export type AddPlaylistDialogProps = {
    isOpen: boolean,
    onClose: () => void,
    onLoadPlaylistPreview: (e: React.ChangeEvent<HTMLInputElement>) => void,
    previewImage: string | null,
    setNewPlaylistTitle: Dispatch<SetStateAction<string>>
}
export type AddTrackDialogProps = {
    isOpen: boolean,
    onClose: () => void,
    onTrackLoaded: (e: ChangeEvent<HTMLInputElement>) => void
}

export type SortSelectProps = {
    defaultValue: string;
    onChange: () => void;
    onSelect: (value: string) => void;
};

export type ArtistTopTracksDialogProps = {
    isDialogOpen: boolean,
    onDialogClose: () => void,
    topArtistTracks: { tracks: any[] },
    likedTrackIds: string[],
    onLikeClick: () => void
}

export type SelectedPlaylistProps = {
    isVisible: boolean,
    selectedPlaylist: Playlist,
    onPlaylistClosed: () => void,
}