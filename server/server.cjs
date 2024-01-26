const express = require('express');
const axios = require('axios');
const {request} = require("axios");
const getSpotifyToken = require("./spotifyToken.cjs");
const {getTracksFromStorage} = require("../firebase_backend/admin.cjs");

const app = express();
const PORT = 3001;
app.get('/getArtists', async (req, res) => {
    try {
        const spotifyToken = await getSpotifyToken();

        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`,
                'Content-Type': 'application/json'
            },
            params: {
                q: req.query.q,
                type: "artist",
                limit: 5
            }
        });

        const artists = response.data;
        res.json(artists);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getTracks', async (req, res) => {
    try {
        const spotifyToken = await getSpotifyToken();

        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`,
                'Content-Type': 'application/json'
            },
            params: {
                q: req.query.q,
                type: "track",
                limit: 5
            }
        });

        const tracks = response.data;
        res.json(tracks);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getSearchedTracks', async (req, res) => {
    try {
        const spotifyToken = await getSpotifyToken();

        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`,
                'Content-Type': 'application/json'
            },
            params: {
                q: req.query.q,
                type: "track",
                limit: 10,
                offset: req.query.offset
            }
        });

        const tracks = response.data;
        res.json(tracks);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getTracksByIds', async (req, res) => {
    try {
        const spotifyToken = await getSpotifyToken();

        const response = await axios.get('https://api.spotify.com/v1/tracks', {
            headers: {
                'Authorization': `Bearer ${spotifyToken}`,
                'Content-Type': 'application/json'
            },
            params: {
                ids: req.query.ids
            }
        });

        const tracks = response.data;
        res.json(tracks);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getTrackUrls', async (req, res) => {
    try {
        const result = await getTracksFromStorage(userId)
        res.json(result)
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Internal Server Error' });
    }

})

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
