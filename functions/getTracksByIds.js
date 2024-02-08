const express = require('express');
const axios = require('axios');

const app = express();

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

async function getSpotifyToken() {
    try {
        const CLIENT_ID = '19f4bb27dc974adbb050a9a516a6d978';
        const CLIENT_SECRET = 'e6a5b9ef814648dfb7e1a8599d674049';

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'client_credentials'
            }
        };

        const response = await axios(authOptions);

        if (response.status === 200) {
            return response.data.access_token;
        } else {
            console.error('Ошибка при получении токена доступа:', response.status, response.data);
            throw new Error('Ошибка при получении токена доступа');
        }
    } catch (error) {
        console.error('Ошибка при получении токена доступа:', error.message);
        throw new Error('Произошла ошибка при получении токена доступа');
    }
}

module.exports = app;
