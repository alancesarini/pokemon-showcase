import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { PokemonDetailType } from '../../types/PokemonType';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface PokemonDetailProps {
	pokemonData: PokemonDetailType | null;
	onBackClick: () => void;
	loading: boolean;
	error: string | null;
}

const PokemonDetail = (props: PokemonDetailProps): JSX.Element => {
	const avatarStyle = {
		width: 80,
		height: 80,
		position: 'absolute',
		top: '-40px',
		right: '-40px',
		backgroundColor: '#ffb6ec'
	};

	return (
		<div>
			{props.loading && <LoadingIndicator />}

			{!props.loading && !!props.error === false && !!props.pokemonData && (
				<Grid container justifyContent={'center'} mt={5} role={'pokemon-card'}>
					<Grid item xs={4} sx={{ position: 'relative' }}>
						<Avatar alt={props.pokemonData.name} src={props.pokemonData.picture_front} sx={avatarStyle} role={'avatar'} />
						<Card>
							<CardContent>
								<Typography gutterBottom variant={'h5'} component={'div'} role={'name'}>
									{props.pokemonData.name}
								</Typography>
								<Typography variant={'body2'} color={'text.secondary'} align={'left'} role={'species'}>
									<strong>Species: </strong>
									{props.pokemonData.species}
								</Typography>
								<Typography variant={'body2'} color={'text.secondary'} align={'left'} role={'height'}>
									<strong>Height: </strong>
									{props.pokemonData.height.toString()}
								</Typography>
								<Typography variant={'body2'} color={'text.secondary'} align={'left'} role={'abilities'}>
									<strong>Abilities: </strong>
									{props.pokemonData.abilities.join(', ')}
								</Typography>
								<Typography variant={'body2'} color={'text.secondary'} align={'left'} role={'forms'}>
									<strong>Forms: </strong>
									{props.pokemonData.forms.join(', ')}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small' onClick={props.onBackClick} role={'back-button'}>
									<ArrowCircleLeftOutlinedIcon />
									<Typography pl={1}>Back to list</Typography>
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
			)}

			{!!props.error && <ErrorMessage error={props.error} />}
		</div>
	);
};

export default PokemonDetail;
