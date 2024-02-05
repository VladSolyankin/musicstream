import React, {useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {Playlist} from "@types";
import {useUserPlaylists} from "@hooks";
import PlaylistItemPicker from "../MyMusic/PlaylistItemPicker.tsx";
import {nanoid} from "nanoid";
import {userId} from "@constants";

const PlaylistPicker = ({isPickerOpen, onPickerClose, trackId, previewUrl}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    useUserPlaylists(setPlaylists, userId)

    return (
        <Dialog open={isPickerOpen} onClose={onPickerClose} maxWidth={"lg"}>
            <DialogTitle className="text-center">Выберите плейлист для добавления</DialogTitle>
            <DialogContent className="grid grid-cols-5 bg-gray-12">
                {
                    playlists.map(playlist => (
                        <PlaylistItemPicker key={nanoid()} playlist={playlist} trackId={trackId} previewUrl={previewUrl} onPlaylistSelect={() => onPickerClose()}/>
                    ))
                }
            </DialogContent>
        </Dialog>
    );
};

export default PlaylistPicker;