import './App.css';

import { useState } from 'react';

import { searchArtworks } from '../utils/api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

export function App() {
	const [results, setResults] = useState([]);

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/uitls/api.js
		searchArtworks(query).then((json) => {
			setResults(
				json.data.map(({ id, title, artist_title }) => ({
					id,
					title,
					artist_title,
				}))
			);
		});
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			<ul>
				{results.map((artwork) => (
					<li key={artwork.id}>
						{artwork.title} by {artwork.artist_title}
					</li>
				))}
			</ul>
			<Footer />
		</div>
	);
}
