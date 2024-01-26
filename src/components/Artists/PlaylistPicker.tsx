import React, {useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {Playlist} from "@types/index.ts";
import {useUserPlaylists} from "../../hooks/hooks.ts";
import PickerPlaylistItem from "../MyMusic/PickerPlaylistItem.tsx";
import {nanoid} from "nanoid";
import {userId} from "../../ts/constants";

const PlaylistPicker = ({isPickerOpen, onPickerClose, trackId, previewUrl}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    useUserPlaylists(setPlaylists, userId)

    return (
        <Dialog open={isPickerOpen} onClose={onPickerClose} maxWidth={"lg"}>
            <DialogTitle className="text-center">Выберите плейлист для добавления</DialogTitle>
            <DialogContent className="grid grid-cols-5 bg-gray-12">
                {
                    playlists.map(playlist => (
                        <PickerPlaylistItem key={nanoid()} playlist={playlist} trackId={trackId} previewUrl={previewUrl} onPlaylistSelect={() => onPickerClose()}/>
                    ))
                }
            </DialogContent>
        </Dialog>
    );
};

export default PlaylistPicker;