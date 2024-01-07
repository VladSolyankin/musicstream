const axios = require('axios');

const CLIENT_ID = '19f4bb27dc974adbb050a9a516a6d978';
const CLIENT_SECRET = 'e6a5b9ef814648dfb7e1a8599d674049';

async function getSpotifyToken() {
    try {
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
            const token = response.data.access_token;
            console.log('Токен получен:', token);
            return token;
        } else {
            console.error('Ошибка при получении токена доступа:', response.status, response.data);
            throw new Error('Ошибка при получении токена доступа');
        }
    } catch (error) {
        console.error('Ошибка при получении токена доступа:', error.message);
        throw new Error('Произошла ошибка при получении токена доступа');
    }
}

module.exports = getSpotifyToken;