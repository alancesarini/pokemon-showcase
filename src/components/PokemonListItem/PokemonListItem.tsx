import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface PokemonListItemProps {
	name: string;
	url: string;
}

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#1A2027',
	...theme.typography.body2,
	padding: theme.spacing(1),
	fontSize: 20,
	textAlign: 'center',
	color: theme.palette.text.secondary,
	textDecoration: 'none',
	'&:hover': {
		backgroundColor: '#2D3748'
	}
}));

const PokemonListItem = (props: PokemonListItemProps): JSX.Element => {
	return (
		<Link to={props.url} style={{ textDecoration: 'none' }}>
			<Item role={'pokemon-list-item'}>{props.name}</Item>
		</Link>
	);
};

export default PokemonListItem;
