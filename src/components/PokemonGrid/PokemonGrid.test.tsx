import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PokemonGrid from './PokemonGrid';

const props = {
	items: [
		{
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/'
		},
		{
			name: 'ivysaur',
			url: 'https://pokeapi.co/api/v2/pokemon/2/'
		}
	],
	loading: false,
	error: '',
	searchText: '',
	onSearch: jest.fn(),
	onCancelSearch: jest.fn()
};

describe('PokemonGrid', () => {
	it('should only render the grid with exactly 2 elements and the search', () => {
		const { container, queryByRole, queryAllByRole } = render(
			<Router>
				<PokemonGrid {...props} />
			</Router>
		);
		expect(queryAllByRole('pokemon-list-item')).toHaveLength(2);
		expect(queryByRole('pokemon-search')).toBeInTheDocument();
		expect(queryByRole('error')).toBeNull();
		expect(queryByRole('loading-indicator')).toBeNull();
	});

	it('should render only the error', () => {
		props.error = 'Error!';
		const { container, queryByRole, queryAllByRole } = render(
			<Router>
				<PokemonGrid {...props} />
			</Router>
		);
		expect(queryAllByRole('pokemon-list-item')).toHaveLength(0);
		expect(queryByRole('pokemon-search')).toBeNull();
		expect(queryByRole('error')).toBeInTheDocument();
		expect(queryByRole('loading-indicator')).toBeNull();
	});

	it('should render only the loading indicator', () => {
		props.error = '';
		props.loading = true;
		const { container, queryByRole, queryAllByRole } = render(
			<Router>
				<PokemonGrid {...props} />
			</Router>
		);
		expect(queryAllByRole('pokemon-list-item')).toHaveLength(0);
		expect(queryByRole('pokemon-search')).toBeNull();
		expect(queryByRole('error')).toBeNull();
		expect(queryByRole('loading-indicator')).toBeInTheDocument();
	});
});
