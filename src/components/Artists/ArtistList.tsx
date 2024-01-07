import React, {useEffect, useState} from 'react';

const ArtistList: React.FC = () => {

	const [artistList, setArtistList] = useState<string[]>([]);

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
			return data.artists.items.map((artist: any) => ({ name: artist.name, image: artist.images[0].url }));
		} catch (error) {
			console.error('Error fetching artists:', error.message);
			return [];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await Promise.all(
				getAlphabetLetters().map(async (letter) => {
					const artistsForLetter = await getArtists(letter);
					return { letter, artists: artistsForLetter };
				})
			);

			console.log(result)

			setArtistList(result);
		};

		fetchData();
	}, []);

	return (
		<div className="flex flex-col items-center gap-10">
			<ul>
				{artistList.map((item, index) => (
					<li key={index} className="text-white">
						<span>{item.letter}:</span>
						{
							item.artists.map((artist, index) => (
								<li key={index} className="flex flex-col items-center">
									<img className="w-32 h-32" src={artist.image} alt="Artist image"/>
									<span>{artist.name}</span>
								</li>
							))
						}
					</li>
				))}
				<br/>
			</ul>
		</div>
	);
};

export default ArtistList;