import React from 'react';
import {PickerPlaylistItemProps} from "@types";
import {addNewPlaylistTrack} from "@firebase/index.js";
import {userId} from "@constants";

const PickerPlaylistItem: React.FC<PickerPlaylistItemProps> = ({ playlist, trackId, previewUrl, onPlaylistSelect }) => {

    return (
        <div key={playlist.id}>
            <div className="bg-gray-100 p-2 rounded flex items-center"
                 onPointerDown={() => {
                     onPlaylistSelect()
                     addNewPlaylistTrack(userId, playlist.id, previewUrl, trackId)
                 }}>
                <img className="w-44 h-44 rounded mr-2 hover:scale-105"
                     src={playlist.imagePath} alt={playlist.title}
                />
            </div>
            <h2 className="text-white text-xl text-center">
                {playlist.title}
            </h2>
        </div>
    );
};

export default PickerPlaylistItem;