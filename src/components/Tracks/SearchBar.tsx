import React from 'react';


interface SearchBarProps {
	setQuery: (query: string) => void,
	onTrackSearch: () => void
}
const SearchBar: React.FC<SearchBarProps> = ({setQuery, onTrackSearch}) => {
	return (
		<div>
			<div className="flex justify-between items-center bg-gray-12 max-w-5xl mx-auto h-16 border-2 border-white rounded-3xl p-6 my-14 text-lg">
				<input onChange={e => setQuery(e.target.value)} className="flex items-center pl-5 rounded-3xl bg-gray-600 w-2/3 h-8 text-white" placeholder="Найдите ваши треки..."></input>
				<button onClick={onTrackSearch}>
					<img src="src/assets/search_icon.png" alt="Search icon" className="w-8 h-8"/>
				</button>
			</div>
		</div>
	);
};

export default SearchBar;