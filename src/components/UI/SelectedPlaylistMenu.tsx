import React from 'react';

const SelectedPlaylistMenu = ({onDeletePlaylist, onRenamePlaylist}) => {
    return (
        <div className="flex flex-col w-[300px] min-h-[150px] gap-2">
            <span className="text-xl text-center font-bold">Управление плейлистом</span>
            <div className="flex flex-col items-start text-lg">
                <button onClick={onDeletePlaylist}>1. <a className="text-red">Удалить плейлист</a></button>
                <button onClick={onRenamePlaylist}>2. <a>Переименовать плейлист</a></button>
            </div>
        </div>
    );
};

export default SelectedPlaylistMenu;