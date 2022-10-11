import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PokemonGrid from '../components/PokemonGrid/PokemonGrid';
import { PokemonItemType } from '../types/PokemonType';
import { API_URL } from '../constants/constants';
import Pagination from '../components/Pagination/Pagination';

interface PokemonGridProps {
	cache: [Map<string, any>, (key: string, value: any) => void];
}

const GridPage = (props: PokemonGridProps): JSX.Element => {
	const [pokemonList, setPokemonList] = useState<PokemonItemType[]>([]);
	const [backupPokemonList, setBackupPokemonList] = useState<PokemonItemType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [cacheValues, setCacheValue] = props.cache;
	const [offset, setOffset] = useState<number>(0);
	const [showNextPage, setShowNextPage] = useState<boolean>(true);
	const [showPrevPage, setShowPrevPage] = useState<boolean>(false);

	const getData = useCallback(async () => {
		const url = `${API_URL}?limit=50&offset=${offset}`;
		if (cacheValues.has(url)) {
			setPokemonList(cacheValues.get(url));
		} else {
			try {
				setLoading(true);
				const response = await axios.get(url);
				const list = response.data.results.map((pokemon: any) => getPokemonList(pokemon));
				setLoading(false);
				setPokemonList(list);
				setCacheValue(url, list);
				if (!list.length) {
					setShowNextPage(false);
				}
			} catch (error: any) {
				setLoading(false);
				setError(error.message);
				console.error(error);
			}
		}
	}, [cacheValues, offset, setCacheValue]);

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		if (offset > 0) {
			getData();
		}
	}, [offset, getData]);

	useEffect(() => {
		if (offset > 0) {
			setShowPrevPage(true);
		} else {
			setShowPrevPage(false);
		}
	}, [offset]);

	const getPokemonList = (data: any): PokemonItemType => {
		return {
			name: data.name,
			url: data.url
		};
	};

	const searchHandler = (value: string): void => {
		if (value.length > 0) {
			setSearchText(value);
			setBackupPokemonList(pokemonList);
			const updatedPokemonList = pokemonList.filter((pokemon) => pokemon.name.toUpperCase().includes(value.toUpperCase()));
			setPokemonList(updatedPokemonList);
		}
	};

	const cancelSearchHandler = (): void => {
		setSearchText('');
		setPokemonList([...backupPokemonList]);
	};

	const nextPageHandler = (): void => {
		setOffset(offset + 50);
	};

	const prevPageHandler = (): void => {
		if (offset > 0) {
			setOffset(offset - 50);
		}
	};

	return (
		<>
			<PokemonGrid items={pokemonList} loading={loading} error={error} searchText={searchText} onSearch={searchHandler} onCancelSearch={cancelSearchHandler} />
			{!!searchText === false && !!loading === false && !!error === false && <Pagination showPrevPage={showPrevPage} showNextPage={showNextPage} onPrevPage={prevPageHandler} onNextPage={nextPageHandler} />}
		</>
	);
};

export default GridPage;
