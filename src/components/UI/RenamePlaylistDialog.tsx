import {Dialog, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {AddTrackDialogProps} from "@types";
import React from "react";
import {Input} from "antd";

const RenamePlaylistDialog =
    ({
         isOpen,
         onClose,
         onNameChange
     }) => {
        return (
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>Переименовать плейлист</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-5 w-96">
                        <DialogContentText>Выберите новое название</DialogContentText>
                        <Input type="text" onChange={onNameChange}/>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

export default RenamePlaylistDialog;