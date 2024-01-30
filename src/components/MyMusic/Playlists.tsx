import React, {useState} from 'react';
import {addNewPlaylist, getUserPlaylists} from "@firebase/index.js"
import {Playlist, PlaylistsProps} from "@types";
import {useUserPlaylists} from "@hooks";
import PlaylistItem from "./PlaylistItem.tsx";
import AddPlaylistDialog from "../UI/AddPlaylistDialog.tsx";
import {nanoid} from "nanoid";
import {userId} from "@constants";

const Playlists: React.FC<PlaylistsProps> = ({onPlaylistSelect}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('')
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const addPlaylist = () => setIsDialogOpen(true)

    const onDialogClose = () => {
        setIsDialogOpen(false)
        const newPlaylist: Playlist = {
            id: nanoid(),
            title: newPlaylistTitle,
            imagePath: previewImage || '/assets/liked.png'
        };

        if (newPlaylist.title && newPlaylist.imagePath) {
            setPlaylists([...playlists, newPlaylist]);
            addNewPlaylist(userId, newPlaylist.id, newPlaylistTitle, previewImage)
                .then(() => console.log("New playlist added to database"))
        }
        else {
            console.warn("Playlist not added")
        }
    }

    const onLoadPlaylistPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useUserPlaylists(setPlaylists, userId)

    return (
        <div className="flex flex-col justify-center items-center border-2 min-h-32dvh min-w-full max-w-5xl mx-auto my-10 py-10 rounded-xl bg-gray-12 p-10 gap-3">
            <div className="flex items-center justify-between w-full">
                <div className="flex">
                    <div className="relative">
                        <img src="/assets/grid_icon.png" alt="Add new playlist button" className="w-8 h-8 mr-5"/>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Ваши плейлисты
                    </h2>
                </div>
                <div onClick={addPlaylist} className="">
                    <img src="/assets/add_playlist_button.png" alt="Add new playlist button" className="w-12 h-12"/>
                </div>
            </div>
            <div className="grid gap-20 2xl:grid-cols-playlistsWrap-2xl xl:grid-cols-playlistsWrap-xl lg:grid-cols-playlistsWrap-lg md:grid-cols-playlistsWrap-md sm:grid-cols-playlistsWrap-sm">
                {
                    playlists &&
                    playlists.map((playlist) => (
                        <PlaylistItem key={playlist.id} playlist={playlist} onPlaylistSelect={() => onPlaylistSelect(playlist)} />
                    ))
                }
            </div>
            <AddPlaylistDialog
                isOpen={isDialogOpen}
                onClose={onDialogClose}
                onLoadPlaylistPreview={onLoadPlaylistPreview}
                previewImage={previewImage}
                setNewPlaylistTitle={setNewPlaylistTitle}
            />
        </div>
    );
};

export default Playlists;