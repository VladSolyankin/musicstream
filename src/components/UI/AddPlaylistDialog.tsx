import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField } from '@mui/material';
import {AddPlaylistDialogProps} from "@types/index.ts";
import React from "react";

const AddPlaylistDialog: React.FC<AddPlaylistDialogProps> =
    ({
         isOpen,
         onClose,
         onLoadPlaylistPreview,
         previewImage,
         setNewPlaylistTitle}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Добавить новый плейлист</DialogTitle>
            <DialogContent>
                <div className="flex flex-col gap-5 w-96">
                    <DialogContentText>Выберите обложку и название:</DialogContentText>
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="w-16 h-16 mb-2" />
                    )}
                    <input type="file" onChange={onLoadPlaylistPreview} />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Название плейлиста"
                        type="input"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewPlaylistTitle(e.target.value)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddPlaylistDialog;