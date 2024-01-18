import React, {useEffect, useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import useStore from "../../store/store.js";
import {Artist} from "../../ts/types";
import TopSearchedTracks from "./TopSearchedTracks.tsx";
import SortSelect from "../UI/SortSelect.tsx";
import ArtistTopTracksDialog from "../UI/PopularTracksDialog.tsx";
import PlaylistPicker from "./PlaylistPicker.tsx";

const ArtistList: React.FC = () => {

	const { likedTrackIds } = useStore()

	const [artistList, setArtistList] = useState<Artist[]>([]);
	const [topArtistTracks, setTopArtistTracks] = useState({})
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentSorting, setCurrentSorting] = useState(false)

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
			return data.artists.items.map((artist) => ({ name: artist.name, image: artist.images[0].url || artist.images[1] || artist.images[2] }));
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
		console.log(artistList)
	}, []);

	const onArtistShow = async (artist: string) => {
		await getArtistTopTracks(artist)
		setIsDialogOpen(true)
	}

	const onDialogClose = () => {
		setIsDialogOpen(false)
	}

	const changeSortingOrder = (order: string) => {
		if (!currentSorting && order === "desc" || currentSorting && order === "asc") {
			setArtistList(artistList.slice().reverse())
			setCurrentSorting(!currentSorting)
		}
	}

	const onPickerOpen = () => setPickerVisible(true)

	return (
		<div>
			<SortSelect
				defaultValue="Сортировка"
				onChange={() => {}}
				onSelect={changeSortingOrder}
			/>
			<div className="flex flex-col items-center gap-20 my-10">
				<>
					{artistList.map((item, index) => (
						<div className="flex flex-col gap-3" key={item.toString() + index.toString()}>
							<span className="text-white text-5xl font-jost">{item.letter}:</span>
							<div key={index} className="flex text-white gap-5">
								{
									item.artists.map((artist: Artist, index: number) => (
										<div key={index} className="flex flex-col items-center gap-2">
											<button onClick={() => onArtistShow(artist.name)}>
												<img className="w-64 h-64 rounded-xl hover:scale-105" src={artist.image || ""} alt="Artist image"/>
											</button>
											<span className="text-2xl text-white">{artist.name}</span>
										</div>
									))
								}
							</div>
						</div>
					))}
				</>
				<ArtistTopTracksDialog
					isDialogOpen={isDialogOpen}
					onDialogClose={onDialogClose}
					topArtistTracks={topArtistTracks}
					likedTrackIds={likedTrackIds}
					onLikeClick={() => {}}
				/>
			</div>
		</div>
	);
};

export default ArtistList;