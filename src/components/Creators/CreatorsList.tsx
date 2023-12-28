import React from 'react';

const CreatorsList: React.FC = () => {

	const getAllEnglishLetters = () => {
		const alphabet = []
		const firstLetter = 'A'.charCodeAt(0)
		const lastLetter = 'Z'.charCodeAt(0)

		for (let i = firstLetter; i <= lastLetter; i++) {
			alphabet.push(String.fromCharCode(i))
		}

		return alphabet
	}


	return (
		<div className="flex flex-col items-center gap-10">
			{
				getAllEnglishLetters().map(letter => (
					<ul className="columns-3" key={letter + letter.id}>
						<h2 className="text-white">{letter}</h2>
						<div>
							{
								//getArtistById(getArtistsIdsByLetter(letter))
							}
						</div>
					</ul>
				))
			}
		</div>
	);
};

export default CreatorsList;