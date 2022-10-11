import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

interface ErrorMessageProps {
	error: string;
}

const ErrorMessage = (props: ErrorMessageProps): JSX.Element => {
	return (
		<Grid container mt={5} justifyContent={'center'}>
			<Grid item xs={6}>
				<Alert severity={'error'} role={'error'}>
					{props.error}
				</Alert>
			</Grid>
		</Grid>
	);
};

export default ErrorMessage;
