import React, {useState} from 'react';
import {Dialog, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {getFirestore, setDoc, doc} from 'firebase/firestore'
import {app} from '../../../firebase/index.cjs'
import useStore from "../../store/store.js";

interface Playlist {
    id: number,
    name: string,
    imgPath: string
}

interface PlaylistsProps {
    onPlaylistSelect: (imagePath: string, playlistTitle: string) => void;
}

const Playlists: React.FC<PlaylistsProps> = ({onPlaylistSelect}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('')
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {currentUser} = useStore()

    const addPlaylist = () => setIsDialogOpen(true)

    const onDialogClose = () => {
        setIsDialogOpen(false)
        const newPlaylist: Playlist = {
            id: playlists.length + 1,
            name: newPlaylistTitle,
            imgPath: previewImage || 'src/assets/liked.png'
        };
        setPlaylists([...playlists, newPlaylist]);

        // setDoc(doc(getFirestore(app), `users.Zzp8sIC72jHLfmWP3w6j.playlists`, `${newPlaylistTitle}`),
        //     { title: newPlaylistTitle }
        // ).then(() => console.log("playlist added"))
    }

    const onLoadPlaylistPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center border-2 min-h-32dvh min-w-full max-w-5xl mx-auto my-10 py-10 rounded-xl bg-gray-12 p-10 gap-3">
            <div className="flex items-center justify-between w-full">
                <div className="flex">
                    <div className="relative">
                        <img src="src/assets/grid_icon.png" alt="Add new playlist button" className="w-8 h-8 mr-5"/>
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                        Ваши плейлисты
                    </h2></div>
                <div onClick={addPlaylist} className="">
                    <img src="src/assets/add_playlist_button.png" alt="Add new playlist button" className="w-12 h-12"/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-20">
                {playlists.map(playlist => (
                    <div key={playlist.id}>
                        <div className="bg-gray-100 p-2 rounded flex items-center">
                            <button onClick = {() => onPlaylistSelect(playlist.imgPath, playlist.name)}>
                                <img className="w-44 h-44 rounded mr-2 hover:scale-90 duration-150"
                                    src={playlist.imgPath} alt={playlist.name}/>
                            </button>
                        </div>
                        <h2 className="text-white text-xl text-center">
                            {playlist.name}
                        </h2>
                    </div>
                ))}
            </div>
            <Dialog open={isDialogOpen} onClose={onDialogClose}>
                <DialogTitle>Добавить новый плейлист</DialogTitle>
                <DialogContent>
                    <DialogContentText>Выберите обложку и название:</DialogContentText>
                    {previewImage && <img
                        src={previewImage}
                        alt="Preview"
                        className="w-12 h-12 rounded-full mb-2"
                    />}
                    <input type="file" onChange={onLoadPlaylistPreview}/>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Название плейлиста"
                        type="input"
                        fullWidth
                        variant="standard"
                        onChange={e => setNewPlaylistTitle(e.target.value)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Playlists;