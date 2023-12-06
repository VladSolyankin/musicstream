const getIdsByName = {
	method: 'GET',
	url: 'https://spotify23.p.rapidapi.com/search/',
	params: {
		q: query,
		type: 'multi',
		offset: '0',
		limit: '10',
		numberOfTopResults: '5'
	},
	headers: {
		'X-RapidAPI-Key': '0bbb99e9camsh3a78c22b61a5eb1p11d075jsn4925d1d25223',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};