const express = require('express');
const axios = require('axios');
const {request} = require("axios");
const getSpotifyToken = require("./spotifyToken.cjs");

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

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
