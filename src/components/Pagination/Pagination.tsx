import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationProps {
	showPrevPage: boolean;
	showNextPage: boolean;
	onPrevPage: () => void;
	onNextPage: () => void;
}

const NavigationButton = styled.button`
	border: none;
	color: #1a2027;
	background-color: transparent;
	&:hover {
		cursor: pointer;
		color: #fff;
	}
`;

const Pagination = (props: PaginationProps): JSX.Element => {
	return (
		<Grid container justifyContent={'center'}>
			{props.showPrevPage && (
				<Grid item>
					<NavigationButton onClick={props.onPrevPage} role={'pagination-prev'}>
						<ArrowBackIosIcon />
					</NavigationButton>
				</Grid>
			)}
			{props.showNextPage && (
				<Grid item>
					<NavigationButton onClick={props.onNextPage} role={'pagination-next'}>
						<ArrowForwardIosIcon />
					</NavigationButton>
				</Grid>
			)}
		</Grid>
	);
};

export default Pagination;
