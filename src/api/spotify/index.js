// main.js
import getSpotifyToken from './spotifyToken.js';

const BASE_URL = 'https://api.spotify.com/v1';

async function getAllArtists(query) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`${BASE_URL}/search?q=${query}&type=artist&limit=5`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.artists;
    } catch (error) {
        console.error('Error getting artists:', error.message);
        throw error;
    }
}

async function getTracks(query) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`${BASE_URL}/search?q=${query}&type=track&limit=5`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.tracks;
    } catch (error) {
        console.error('Error getting tracks:', error.message);
        throw error;
    }
}

async function getSearchedTracks(query, offset) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`${BASE_URL}/search?q=${query}&type=track&limit=10&offset=${offset}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.tracks;
    } catch (error) {
        console.error('Error getting searched tracks:', error.message);
        throw error;
    }
}

async function getTracksByIds(ids) {
    try {
        const token = await getSpotifyToken();
        const response = await fetch(`${BASE_URL}/tracks?ids=${ids}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.tracks;
    } catch (error) {
        console.error('Error getting tracks by IDs:', error.message);
        throw error;
    }
}

export { getAllArtists, getTracks, getSearchedTracks, getTracksByIds };
