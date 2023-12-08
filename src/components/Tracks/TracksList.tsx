import axios from "axios";
import {useEffect, useState} from "react";
import {getIdsByName, getTrackPreviews} from "../../js/spotifyAPI.js"
// import "./Tracks.css"

export const TracksList = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isFunctionExecuted, setIsFunctionExecuted] = useState(false)
    const [likedTracksIds, setLikedTracksIds] = useState([])


    const onTrackSearch = async () => {
        try {
            const tracksIds = await getIdsByName(query)
            const trackPreviews = await getTrackPreviews(tracksIds)
            setTracks(trackPreviews)

            setIsFunctionExecuted(true)

        } catch (error) {
            console.error('Error searching tracks:', error.message);
        }
    };

    const onLikeClick = (trackId) => {
        if (likedTracksIds.includes(trackId)) {
            setLikedTracksIds(likedTracksIds.filter(id => id !== trackId))
        }
        else {
            setLikedTracksIds([...likedTracksIds, trackId])
        }
    }

    return (
        <div style={{height: "140vh"}} className="max-w-5xl mx-auto mb-52">
            <div className="flex justify-between items-center bg-gray-12 max-w-5xl mx-auto h-16 border-2 border-white rounded-3xl p-6 my-14">
                <input onChange={e => setQuery(e.target.value)}
                    className="flex items-center pl-5 rounded-3xl bg-gray-600 w-2/3 h-8 text-white" placeholder="Найдите ваши треки..."></input>
                <button onClick={onTrackSearch}>
                    <img src="src/assets/search_icon.png" alt="Search icon" className="w-8 h-8"/>
                </button>
            </div>
            {
                isFunctionExecuted ?
                    <div>
                        <ol className="flex-col">
                            {tracks.map((track) => (
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
                    <></>
            }
        </div>
    );
};


export default TracksList;