import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonDetailType } from '../types/PokemonType';
import { API_URL } from '../constants/constants';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';

interface PokemonDetailProps {
	cache: [Map<string, any>, (key: string, value: any) => void];
}

const DetailPage = (props: PokemonDetailProps): JSX.Element => {
	const [pokemonData, setPokemonData] = useState<PokemonDetailType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { pokemonName } = useParams<{ pokemonName: string }>();
	const [cacheValues, setCacheValue] = props.cache;
	const navigate = useNavigate();

	const getData = useCallback(
		async (url: string) => {
			if (cacheValues.has(url)) {
				setPokemonData(cacheValues.get(url));
			} else {
				try {
					if (pokemonName) {
						setLoading(true);
						const response = await axios.get(url);
						const pokemonDetail = getPokemon(response.data, pokemonName);
						setPokemonData(pokemonDetail);
						setCacheValue(url, pokemonDetail);
						setLoading(false);
					}
				} catch (error: any) {
					setLoading(false);
					setError(error.message);
					console.error(error);
				}
			}
		},
		[pokemonName, cacheValues, setCacheValue]
	);

	const getPokemon = (data: any, pokemonName: string): PokemonDetailType => {
		return {
			name: pokemonName,
			picture_front: data.sprites.front_default,
			picture_back: data.sprites.back_default,
			abilities: data.abilities.map((ability: any) => ability.ability.name),
			forms: data.forms.map((form: any) => form.name),
			height: data.height,
			species: data.species.name
		};
	};

	useEffect(() => {
		getData(`${API_URL}/${pokemonName}`);
	}, [getData, pokemonName]);

	const goBackClickHandler = (): void => {
		navigate('/');
	};

	return <PokemonDetail pokemonData={pokemonData} loading={loading} error={error} onBackClick={goBackClickHandler} />;
};

export default DetailPage;
