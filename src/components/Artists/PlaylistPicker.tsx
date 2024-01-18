import React, {useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {Playlist} from "@types/index.ts";
import {useUserPlaylists} from "../../hooks/hooks.ts";
import PickerPlaylistItem from "../MyMusic/PickerPlaylistItem.tsx";

const PlaylistPicker = ({isPickerOpen, onPickerClose, trackId}) => {
    const [playlists, setPlaylists] = useState<Playlist[]>([])

    useUserPlaylists(setPlaylists, localStorage.getItem("currentUserId"))

    return (
        <Dialog open={isPickerOpen} onClose={onPickerClose} maxWidth={"lg"}>
            <DialogTitle className="text-center">Выберите плейлист для добавления</DialogTitle>
            <DialogContent className="grid grid-cols-3 bg-gray-12">
                {
                    playlists.map(playlist => (
                        <PickerPlaylistItem playlist={playlist} trackId={trackId} onPlaylistSelect={() => {}}/>
                    ))
                }
            </DialogContent>
        </Dialog>
    );
};

export default PlaylistPicker;