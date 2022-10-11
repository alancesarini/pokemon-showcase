import { render } from '@testing-library/react';
import PokemonDetail from './PokemonDetail';

const data = {
	name: 'bulbasaur',
	height: 7,
	picture_front: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
	picture_back: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
	abilities: ['overgrow', 'chlorophyll'],
	forms: ['bulbasaur'],
	species: 'bulbasaur'
};

const error = 'Error in PokemonDetail';

const backClickHandler = jest.fn();

describe('PokemonDetail', () => {
	it('should render only the pokemon detail', () => {
		const { queryByRole } = render(<PokemonDetail pokemonData={data} onBackClick={backClickHandler} error={''} loading={false} />);
		expect(queryByRole('name')).toBeInTheDocument();
		expect(queryByRole('species')).toBeInTheDocument();
		expect(queryByRole('height')).toBeInTheDocument();
		expect(queryByRole('abilities')).toBeInTheDocument();
		expect(queryByRole('forms')).toBeInTheDocument();
		expect(queryByRole('error')).toBeNull();
		expect(queryByRole('loading-indicator')).toBeNull();
	});

	it('should render only the error', () => {
		const { queryByRole } = render(<PokemonDetail pokemonData={data} onBackClick={backClickHandler} error={error} loading={false} />);
		expect(queryByRole('error')).toBeInTheDocument();
		expect(queryByRole('pokemon-card')).toBeNull();
		expect(queryByRole('loading-indicator')).toBeNull();
	});

	it('should render only the loading indicator', () => {
		const { queryByRole } = render(<PokemonDetail pokemonData={data} onBackClick={backClickHandler} error={''} loading={true} />);
		expect(queryByRole('error')).toBeNull();
		expect(queryByRole('pokemon-card')).toBeNull();
		expect(queryByRole('loading-indicator')).toBeInTheDocument();
	});

	it('should call the handler when the back button is clicked', () => {
		const { getByRole } = render(<PokemonDetail pokemonData={data} onBackClick={backClickHandler} error={''} loading={false} />);
		const backButton = getByRole('back-button');
		backButton.click();
		expect(backClickHandler).toHaveBeenCalledTimes(1);
	});
});
