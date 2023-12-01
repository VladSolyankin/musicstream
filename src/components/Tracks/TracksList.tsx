import axios from "axios";
import {useState} from "react";

const TracksList = () => {
    const [query, setQuery] = useState('');
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState(null);

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

    const handleSearch = async () => {
        try {
            const response1 = await axios.request(getIdsByName);

            setTracks(response1.data.tracks.items);
            let trackIds = response1.data.tracks.items.map(elem => {
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

            const response2 = await axios.request(getTrackPreviews);
            setTracks(response2.data.tracks)

        } catch (error) {
            console.error('Error searching tracks:', error.message);
        }
    };

    const playPreview = (previewUrl) => {
        const audio = new Audio(previewUrl);
        audio.volume = 0.1
        audio.play().then(r => console.log("TAG: success"))
        setCurrentTrack({ previewUrl, audio });
    };

    const stopPreview = () => {
        if (currentTrack) {
            currentTrack.audio.pause();
            setCurrentTrack(null);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center bg-gray-12 max-w-5xl mx-auto h-16 border-2 border-white rounded-3xl p-6 my-14">
                <input onChange={e => setQuery(e.target.value)}
                    className="flex items-center pl-5 rounded-3xl bg-gray-600 w-2/3 h-8 text-white" placeholder="Найдите ваши треки..."></input>
                <button onClick={handleSearch}>
                    <img src="src/assets/search_icon.png" alt="Seacrh icon" className="w-8 h-8"/>
                </button>
            </div>
            <div>
                <ol>
                    {tracks.map((track) => (
                        <li key={track.id} className="border p-4 mb-4 text-white">
                            <span className="text-white">{track.name}</span>
                            <button onClick={() => playPreview(track.preview_url)} className="mt-2 p-2 bg-green-500 text-white">Play Preview</button>
                            <button onClick={stopPreview}>Stop</button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default TracksList;