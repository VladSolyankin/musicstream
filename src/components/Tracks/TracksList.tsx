import {useEffect} from "react";
import {getIdsByName, getSearchedTracks} from "../../js/spotifyAPI.ts"
import SearchBar from "./SearchBar";
import SearchedTracks from "./SearchedTracks";
import TracksPagination from "./TracksPagination";
import useStore from "../../store/store.js";

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

    console.log(useStore())


    const onTrackSearch = async (): Promise<void> => {
        try {
            const tracksIds = await getIdsByName(query, (page * 10).toString())
            console.log(tracksIds)
            const searchedTracks = await getSearchedTracks(tracksIds)
            setTracks(searchedTracks)
            setIsFunctionExecuted(true)
        } catch (error: any) {
            console.error('Error searching tracks:', error.message);
        }
    };

    const onLikeClick = (trackId: string) => {
        likedTracksIds.includes(trackId) ?
            setLikedTracksIds(likedTracksIds.filter(id => id !== trackId))
            :
            setLikedTracksIds([...likedTracksIds, trackId])
    }

    const onPageChange = (currentPage: number) => {
        setPage(currentPage)
        console.log(query)
        console.log(page)
    }

    useEffect(() => {
        if (isFunctionExecuted) {
            onTrackSearch();
        }
    }, [page, isFunctionExecuted]);

    return (
        <div className="max-w-5xl mx-auto mb-52 min-h-screen">
            {/* Search Bar */}
            <SearchBar setQuery={setQuery} onTrackSearch={onTrackSearch} />
            {/* Track list */}
            {
                isFunctionExecuted ?
                    <SearchedTracks likedTracksIds={likedTracksIds} tracks={tracks} onLikeClick={onLikeClick}></SearchedTracks>
                    :
                    <div className="min-h-screen flex justify-center items-center text-white text-5xl">
                        <b>Тут будут ваши треки...</b>
                    </div>
            }
            {/* Pagination */}
            <TracksPagination onPageChange={onPageChange} />
        </div>
    );
};


export default TracksList;