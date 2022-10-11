import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import GridPage from '../../pages/GridPage';
import DetailPage from '../../pages/DetailPage';

const PokemonShowcase = (): JSX.Element => {
	const [cacheValues, setCacheValues] = useState(new Map());

	const setCacheValue = (key: string, value: any) => {
		const updatedCache = new Map(cacheValues);
		updatedCache.set(key, value);
		setCacheValues(updatedCache);
	};

	const cache: [Map<string, any>, (key: string, value: any) => void] = [cacheValues, setCacheValue];

	const darkTheme = createTheme({
		palette: {
			mode: 'dark'
		}
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<Box pt={5} pb={10} sx={{ backgroundColor: 'primary.dark' }}>
				<Routes>
					<Route path='/' element={<GridPage cache={cache} />} />
					<Route path='/detail/:pokemonName' element={<DetailPage cache={cache} />} />
					<Route path='*' element={<div>404</div>} />
				</Routes>
			</Box>
		</ThemeProvider>
	);
};

export default PokemonShowcase;
