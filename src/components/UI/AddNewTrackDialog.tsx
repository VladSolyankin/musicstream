import {Dialog, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {AddTrackDialogProps} from "@types";
import React from "react";

const AddNewTrackDialog: React.FC<AddTrackDialogProps> =
	({
		 isOpen,
		 onClose,
		 onTrackLoaded
		 }) => {
		return (
			<Dialog open={isOpen} onClose={onClose}>
				<DialogTitle>Добавить новый трек</DialogTitle>
				<DialogContent>
					<div className="flex flex-col gap-5 w-96">
						<DialogContentText>Выберите трек: </DialogContentText>
						<input type="file" onChange={onTrackLoaded}/>
					</div>
				</DialogContent>
			</Dialog>
		);
	};

export default AddNewTrackDialog;