import './App.css';

import { useState } from 'react';

import { searchArtworks } from '../utils/api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

const ImageDetailsPage = ({ handleViewToggle, activeResult }) => (
	<>
		<img
			alt={activeResult.title}
			src={`https://www.artic.edu/iiif/2/${activeResult.image_id}/full/843,/0/default.jpg`}
		/>
		<button onClick={handleViewToggle}>Back</button>
	</>
);

export function App() {
	const [results, setResults] = useState([]);
	const [activeResult, setActiveResult] = useState(null);
	const [toggle, setToggle] = useState(true);

	function handleViewToggle(title) {
		setActiveResult(title);
		setToggle((prev) => !prev);
	}

	function onSearchSubmit(query) {
		// Search for the users's query.
		// TODO: render the results, instead of logging them to the console.
		// NOTE: `searchArtworks` currently returns local data, so that we
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/uitls/api.js
		searchArtworks(query).then((json) => {
			console.log(json.data);
			setResults(
				json.data.map(({ image_id, title, artist_title }) => ({
					image_id,
					title,
					artist_title,
				}))
			);
		});
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			{toggle ? (
				<>
					<SearchForm onSearchSubmit={onSearchSubmit} />
					<ul>
						{results.map((artwork) => (
							<li key={artwork.image_id}>
								<button onClick={() => handleViewToggle(artwork)}>
									{artwork.title} by {artwork.artist_title}
								</button>
							</li>
						))}
					</ul>
				</>
			) : (
				<ImageDetailsPage {...{ handleViewToggle, activeResult }} />
			)}
			<Footer />
		</div>
	);
}
