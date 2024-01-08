import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import SearchedTracks from "../Tracks/SearchedTracks.tsx";
import useStore from "../../store/store.js";

const ArtistList: React.FC = () => {

	const { likedTrackIds } = useStore()

	const [artistList, setArtistList] = useState<string[]>([]);
	const [topArtistTracks, setTopArtistTracks] = useState({})
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const getAlphabetLetters = () => {
		const alphabet = [];
		const firstLetter = 'A'.charCodeAt(0);
		const lastLetter = 'Z'.charCodeAt(0);

		for (let i = firstLetter; i <= lastLetter; i++) {
			alphabet.push(String.fromCharCode(i));
		}

		return alphabet;
	};

	const getArtists = async (query: string) => {
		try {
			const response = await fetch(`/getArtists?q=${query}`);
			const data = await response.json();
			return data.artists.items.map((artist: any) => ({ name: artist.name, image: artist.images[0].url || artist.images[1] || artist.images[2] }));
		} catch (error) {
			console.error('Error fetching artists:', error.message);
			return [];
		}
	};

	const getArtistTopTracks = async (artist: string) => {
		try {
			const response = await fetch(`/getTracks?q=${artist}`)
			const data = await response.json()
			console.log(data)
			setTopArtistTracks(data)
		} catch (error) {
			console.error('Error fetching tracks: ', error.message)
			return []
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const result = await Promise.all(
				getAlphabetLetters().map(async (letter) => {
					const artistsForLetter = await getArtists(letter);
					return { letter, artists: artistsForLetter };
				})
			);
			setArtistList(result);
		};

		fetchData();
	}, []);

	const onArtistShow = async (artist: string) => {
		await getArtistTopTracks(artist)
		setIsDialogOpen(true)
	}

	const onDialogClose = () => {
		setIsDialogOpen(false)
	}

	return (
		<div className="flex flex-col items-center gap-20 my-20">
			<>
				{artistList.map((item, index) => (
					<div className="flex flex-col gap-3" key={item.toString() + index.toString()}>
						<span className="text-white text-5xl font-jost">{item.letter}:</span>
						<div key={index} className="flex text-white gap-5">
							{
								item.artists.map((artist, index) => (
									<div key={index} className="flex flex-col items-center gap-2">
										<button onClick={() => onArtistShow(artist.name)}>
											<img className="w-64 h-64 rounded-xl hover:scale-105" src={artist.image || ""} alt="Artist image"/>
										</button>
										<span className="text-2xl font-jost">{artist.name}</span>
									</div>
								))
							}
						</div>
					</div>
				))}
			</>
			<Dialog open={isDialogOpen} onClose={onDialogClose} maxWidth={"lg"}>
				<DialogTitle className="text-center">Лучшие треки исполнителя</DialogTitle>
				<DialogContent className="bg-gray-12">
					<SearchedTracks tracks={topArtistTracks.tracks} likedTracksIds={likedTrackIds} onLikeClick={() => {}}/>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ArtistList;