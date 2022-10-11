import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIndicator = (): JSX.Element => {
	return (
		<Grid container mt={5} justifyContent={'center'} role={'loading-indicator'}>
			<Grid item xs={6}>
				<CircularProgress color={'success'} sx={{ color: '#121212' }} />
			</Grid>
		</Grid>
	);
};

export default LoadingIndicator;
