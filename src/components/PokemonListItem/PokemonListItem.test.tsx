import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PokemonListItem from './PokemonListItem';

describe('PokemonListItem', () => {
	it('should render the pokemon list item', () => {
		const { container, queryByRole } = render(
			<Router>
				<PokemonListItem name='bulbasaur' url='https://pokeapi.co/api/v2/pokemon/1/' />
			</Router>
		);
		expect(queryByRole('pokemon-list-item')).toBeInTheDocument();
	});
});
