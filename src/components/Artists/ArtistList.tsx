import React, {useEffect, useState} from 'react';
import useStore from "@store";
import {Artist} from "@types";
import SortSelect from "../UI/SortSelect.tsx";
import ArtistTopTracksDialog from "../UI/PopularTracksDialog.tsx";
import LoadingSpinner from "../UI/LoadingSpinner";

const ArtistList: React.FC = () => {

	const { likedTrackIds } = useStore()

	const [artistList, setArtistList] = useState<Artist[]>([]);
	const [topArtistTracks, setTopArtistTracks] = useState({})
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentSorting, setCurrentSorting] = useState(false)
	const [spinning, setSpinning] = useState(true)

	const showLoader = () => {
		setTimeout(() => {
			setSpinning(false);
		}, 3000);
	};

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
			setTopArtistTracks(data)
		} catch (error) {
			console.error('Error fetching tracks: ', error.message)
			return []
		}
	}

	useEffect(() => {
		showLoader()
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

	const changeSortingOrder = (order: string) => {
		if (!currentSorting && order === "desc" || currentSorting && order === "asc") {
			setArtistList(artistList.slice().reverse())
			setCurrentSorting(!currentSorting)
		}
	}

	return (
		<div className="flex justify-center">
			{!spinning &&
				<div>
					<SortSelect
					defaultValue="Сортировка"
					onChange={() => {}}
					onSelect={changeSortingOrder}
					/>
					<div className="flex flex-col items-center gap-20 my-10">
						<div>
							{artistList.map((item, index) => (
								<div className="flex flex-col gap-3" key={item.toString() + index.toString()}>
									<span className="text-white text-5xl font-jost">{item.letter}:</span>
									<div key={index} className="grid gap-20 2xl:grid-cols-playlistsWrap-2xl xl:grid-cols-playlistsWrap-xl lg:grid-cols-playlistsWrap-lg md:grid-cols-playlistsWrap-md sm:grid-cols-playlistsWrap-sm text-white gap-5">
										{
											item.artists.map((artist: Artist, index: number) => (
												<div key={index} className="flex flex-col items-center gap-2">
													<button onClick={() => onArtistShow(artist.name)}>
														<img className="w-64 h-64 rounded-xl hover:scale-105" src={artist.image || ""} alt="Artist image"/>
													</button>
													<span
														className="text-2xl text-white w-48 text-center">{artist.name}</span>
												</div>
											))
										}
									</div>
								</div>
							))}
						</div>
						<ArtistTopTracksDialog
							isDialogOpen={isDialogOpen}
							onDialogClose={onDialogClose}
							topArtistTracks={topArtistTracks}
							likedTrackIds={likedTrackIds}
							onLikeClick={() => {
							}}
						/>
					</div>
				</div>}
			{spinning && <LoadingSpinner isSpinning={spinning}/> }
		</div>
	);
};

export default ArtistList;