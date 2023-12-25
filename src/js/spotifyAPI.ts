import axios from "axios";
import {Track} from "../interfaces";

const rapidApiHeaders = {
	'X-RapidAPI-Key': 'ce85377694mshd0b7c2f5e54523dp1325b4jsn354dbf9bda58',
	'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
}

const rapidApiRequests = {
	"search": 'https://spotify23.p.rapidapi.com/search/',
	"tracks": 'https://spotify23.p.rapidapi.com/tracks/',
}

export const getIdsByName = async (query: string, offset: string) => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: rapidApiRequests.search,
			params: {
				q: query,
				type: 'multi',
				offset: offset,
				limit: '10',
				numberOfTopResults: '5'
			},
			headers: rapidApiHeaders
		});
		return response.data.tracks.items.map((elem: { data: { id: any; }; }) => elem.data.id).join(',');
	} catch (error: any) {
		console.error('Error searching tracks by ID:', error.message);
		throw error;
	}
};

export const getSearchedTracks = async (trackIds: Array<string>): Promise<Track[]> => {
	try {
		const response = await axios.request({
			method: 'GET',
			url: rapidApiRequests.tracks,
			params: {
				ids: trackIds
			},
			headers: rapidApiHeaders
		});
		return response.data.tracks;
	} catch (error: any) {
		console.error('Error getting track previews by IDs:', error.message);
		throw error;
	}
};
