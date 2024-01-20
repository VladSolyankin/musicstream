import React from 'react';
import {PickerPlaylistItemProps} from "@types/index.ts";
import {addNewPlaylistTrack} from "../../../firebase/index.cjs";

const PickerPlaylistItem: React.FC<PickerPlaylistItemProps> = ({ playlist, trackId, previewUrl, onPlaylistSelect }) => {

    const userId = localStorage.getItem("currentUserId")

    return (
        <div key={playlist.id}>
            <div className="bg-gray-100 p-2 rounded flex items-center">
                <button onClick={() => {
                    addNewPlaylistTrack(userId, playlist.id, previewUrl, trackId)
                    onPlaylistSelect()
                }}>
                    <img className="w-44 h-44 rounded mr-2 hover:scale-90 duration-150"
                         src={playlist.imagePath} alt={playlist.title} />
                </button>
            </div>
            <h2 className="text-white text-xl text-center">
                {playlist.title}
            </h2>
        </div>
    );
};

export default PickerPlaylistItem;