import {useEffect} from "react";
import SearchBar from "./SearchBar";
import SearchedTracks from "./SearchedTracks";
import TracksPagination from "./TracksPagination";
import useStore from "@store";

export const TracksList = () => {
    const {
        query,
        page,
        tracks,
        isFunctionExecuted,
        likedTracksIds,
        setQuery,
        setPage,
        setTracks,
        setIsFunctionExecuted,
        setLikedTracksIds } = useStore();

    const onTrackSearch = async (): Promise<void> => {
        try {
            const result = await fetch(`/getSearchedTracks?q=${query}&offset=${page*10}`).then(res => res.json())
            setTracks(result.tracks.items)
            setIsFunctionExecuted(true)
        } catch (error: Error) {
            console.error('Error searching tracks:', error.message);
        }
    };

    const onLikeClick = (trackId: string) => {
        likedTracksIds.includes(trackId) ?
            setLikedTracksIds(likedTracksIds.filter((id: string) => id !== trackId))
            :
            setLikedTracksIds([...likedTracksIds, trackId])
    }

    const onPageChange = (currentPage: number) => {
        setPage(currentPage)
    }

    useEffect(() => {
        if (isFunctionExecuted) {
            onTrackSearch();
        }
    }, [page, isFunctionExecuted]);

    return (
        <div className="max-w-5xl mx-auto mb-52 min-h-screen">
            <SearchBar setQuery={setQuery} onTrackSearch={onTrackSearch} />
            {
                isFunctionExecuted ?
                    <SearchedTracks likedTracksIds={likedTracksIds} tracks={tracks} onLikeClick={onLikeClick}></SearchedTracks>
                    :
                    <div className="min-h-screen flex justify-center items-center text-white text-5xl">
                        <b>Тут будут ваши треки...</b>
                    </div>
            }
            <TracksPagination onPageChange={onPageChange} />

        </div>
    );
};


export default TracksList;