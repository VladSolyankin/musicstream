import {useEffect, useState} from "react";
import {getIdsByName, getTrackPreviews} from "../../js/spotifyAPI.ts"
import {Track} from "../../interfaces";

export const TracksList = () => {
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [tracks, setTracks] = useState<Array<Track>>([]);
    const [isFunctionExecuted, setIsFunctionExecuted] = useState(false)
    const [likedTracksIds, setLikedTracksIds] = useState<Array<string>>([])

    const onTrackSearch = async (): Promise<void> => {
        try {
            const tracksIds = await getIdsByName(query, (page * 10).toString())
            const trackPreviews = await getTrackPreviews(tracksIds)
            setTracks(trackPreviews)
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
            {/* Track list */}
            <div className="flex justify-between items-center bg-gray-12 max-w-5xl mx-auto h-16 border-2 border-white rounded-3xl p-6 my-14">
                <input onChange={e => setQuery(e.target.value)}
                    className="flex items-center pl-5 rounded-3xl bg-gray-600 w-2/3 h-8 text-white" placeholder="Найдите ваши треки..."></input>
                <button onClick={onTrackSearch}>
                    <img src="src/assets/search_icon.png" alt="Search icon" className="w-8 h-8"/>
                </button>
            </div>
            {/* Search Bar */}
            {
                isFunctionExecuted ?
                    <div>
                        <ol className="flex-col">
                            {tracks.map((track: Track) => (
                                <li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-between gap-10">
                                    <img src={track.album.images[2].url} alt="" className="basis-1/8"/>
                                    <span className="text-center text-white basis-1/4">{track.name + " - " + track.artists[0].name}</span>
                                    <audio controls src={track.preview_url} className="bg-white basis-2/4"/>
                                    <img onClick={() => onLikeClick(track.id)} src={
                                        likedTracksIds.includes(track.id) ? "src/assets/liked.png" : "src/assets/unliked.png"
                                    } alt="" className="w-8 h-7"/>
                                </li>
                            ))}
                        </ol>
                    </div>
                    :
                    <div className="min-h-screen"></div>
            }
            {/* Pagination */}
            <ul className="flex justify-between gap-10 text-white">
                {
                    Array.from({length: 9}, (_v, index) => (
                      <li key={index}
                          className="border-white border-2 p-4 px-5 font-bold text-2xl hover:bg-gray-600"
                          onClick={() => onPageChange(index)}
                      >
                          {index + 1}
                      </li>
                    ))
                }
            </ul>
        </div>
    );
};


export default TracksList;