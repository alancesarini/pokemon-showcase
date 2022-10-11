import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import PokemonSearch from './PokemonSearch';

const searchHandler = jest.fn();
const cancelHandler = jest.fn();

const props = {
	minChars: 3,
	onSearch: searchHandler,
	onCancel: cancelHandler
};

describe('PokemonSearch', () => {
	it('should render the pokemon search', () => {
		const { queryByRole } = render(
			<Router>
				<PokemonSearch {...props} />
			</Router>
		);
		expect(queryByRole('pokemon-search')).toBeInTheDocument();
	});

	it('should call the search handler', () => {
		const { queryByRole } = render(
			<Router>
				<PokemonSearch {...props} />
			</Router>
		);
		const input = queryByRole('pokemon-search-input') as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'aaa' } });
		waitFor(() => {
			expect(searchHandler).toBeCalled();
		});
	});

	it('should call the cancel handler', () => {
		const { queryByRole } = render(
			<Router>
				<PokemonSearch {...props} />
			</Router>
		);
		const input = queryByRole('pokemon-search-input') as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'aaa' } });
		const button = queryByRole('pokemon-cancel-search') as HTMLButtonElement;
		fireEvent.click(button);
		waitFor(() => {
			expect(cancelHandler).toBeCalled();
		});
	});
});
