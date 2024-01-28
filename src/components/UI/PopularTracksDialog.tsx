import React from 'react';
import {ArtistTopTracksDialogProps} from "@types";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import TopSearchedTracks from "../Artists/TopSearchedTracks.tsx";

const ArtistTopTracksDialog: React.FC<ArtistTopTracksDialogProps> =
    ({
         isDialogOpen,
         onDialogClose,
         topArtistTracks,
         likedTrackIds,
         onLikeClick,
     }) => {



    return (
        <Dialog open={isDialogOpen} onClose={onDialogClose} maxWidth="lg">
            <DialogTitle className="text-center">Популярные треки исполнителя</DialogTitle>
            <DialogContent className="bg-gray-12">
                <TopSearchedTracks
                    tracks={topArtistTracks.tracks}
                    likedTracksIds={likedTrackIds}
                    onLikeClick={onLikeClick}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ArtistTopTracksDialog;