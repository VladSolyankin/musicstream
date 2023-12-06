import axios from "axios";
import {useEffect, useState} from "react";
import "./Tracks.css"

export const TracksList = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [isFunctionExecuted, setIsFunctionExecuted] = useState(false);
    const [isSearchExecuted, setIsSearchExecuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)

    const playButtonImages: ArrayLike<string> = [
        "src/assets/play_button_icon.png",
        "src/assets/pause_button_icon.png"
    ]
    
    const getIdsByName = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: query,
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': '0bbb99e9camsh3a78c22b61a5eb1p11d075jsn4925d1d25223',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    const onTrackSearch = async () => {
        if (isSearchExecuted) {
            setTracks([])
            setIsSearchExecuted(false)
        }
        try {
            const response1 = await axios.request(getIdsByName)
            setTracks(response1.data.tracks.items);
            const trackIds = response1.data.tracks.items.map(elem => {
                return elem.data.id
            }).join(',')
            const getTrackPreviews = {
                method: 'GET',
                url: 'https://spotify23.p.rapidapi.com/tracks/',
                params: {
                    ids: trackIds
                },
                headers: {
                    'X-RapidAPI-Key': '0bbb99e9camsh3a78c22b61a5eb1p11d075jsn4925d1d25223',
                    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
                }
            };

            const response2 = await axios.request(getTrackPreviews)
            setTracks(response2.data.tracks)


            setIsFunctionExecuted(true)
            setIsSearchExecuted(true)
        } catch (error) {
            console.error('Error searching tracks:', error.message);
        }
    };

    const onPlayButtonChange = (previewUrl) => {
        const audio = new Audio(previewUrl);
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        }
        else {
            audio.volume = 0.1
            audio.play().then(result => console.log(result))
            setIsPlaying(true)
        }
    };

    return (
        <div style={{height: "140vh"}} className="max-w-5xl mx-auto mb-52">
            <div className="flex justify-between items-center bg-gray-12 max-w-5xl mx-auto h-16 border-2 border-white rounded-3xl p-6 my-14">
                <input onChange={e => setQuery(e.target.value)}
                    className="flex items-center pl-5 rounded-3xl bg-gray-600 w-2/3 h-8 text-white" placeholder="Найдите ваши треки..."></input>
                <button onClick={onTrackSearch}>
                    <img src="src/assets/search_icon.png" alt="Seacrh icon" className="w-8 h-8"/>
                </button>
            </div>
            {
                isFunctionExecuted ?
                    <div>
                        <ol className="flex-col">
                            {tracks.map((track) => (
                                <li key={track.id} className="border p-4 mb-4 text-white flex items-center justify-start gap-10">
                                    <img src={track.album.images[2].url} alt=""/>
                                    <span className="text-white self-center">{track.artists[0].name + " - " + track.name}</span>
                                    <audio controls src={track.preview_url} />
                                    <div className="self-end">
                                        <button onClick={() => onPlayButtonChange(track.preview_url)}
                                                className="p-2 text-white">
                                            <img src={isPlaying ? playButtonImages[0] : playButtonImages[1]} alt="" className="w-10 h-10 object-fill"/>
                                        </button>
                                    </div>
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