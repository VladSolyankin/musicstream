export type Track = {
    id: string,
    album: Album,
    name: string,
    message: string,
    preview_url?: string,
    artists: Array<Artist>
}

interface Artist {
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
    id: number,
    name: string,
    imgPath: string
}

export type PlaylistsProps = {
    onPlaylistSelect: (imagePath: string, playlistTitle: string) => void;
}