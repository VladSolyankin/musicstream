export interface Track {
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
