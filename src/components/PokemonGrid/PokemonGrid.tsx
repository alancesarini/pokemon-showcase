import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PokemonItemType } from '../../types/PokemonType';
import PokemonSearch from '../PokemonSearch/PokemonSearch';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PokemonListItem from '../PokemonListItem/PokemonListItem';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface PokemonGridProps {
	items: PokemonItemType[];
	loading: boolean;
	error: string | null;
	searchText: string;
	onSearch: (value: string) => void;
	onCancelSearch: () => void;
}

const PokemonGrid = (props: PokemonGridProps): JSX.Element => {
	return (
		<>
			{!props.loading && !!props.error === false && <PokemonSearch minChars={3} onSearch={props.onSearch} onCancel={props.onCancelSearch} />}

			{props.loading && <LoadingIndicator />}

			{!props.loading && !!props.error === false && !!props.items.length && (
				<Box sx={{ m: 6 }}>
					<Grid container spacing={2} mt={2} mb={2}>
						{props.items.map((pokemon: PokemonItemType) => (
							<Grid key={pokemon.name} item xs={2}>
								<PokemonListItem name={pokemon.name} url={`/detail/${pokemon.name}`} />
							</Grid>
						))}
					</Grid>
				</Box>
			)}

			{!!props.searchText && !props.items.length && <ErrorMessage error={`No results found for "${props.searchText}"`} />}

			{!!props.error && <ErrorMessage error={props.error} />}
		</>
	);
};

export default PokemonGrid;
