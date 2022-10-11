import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
	it('should render the error message', () => {
		const { getByRole } = render(<ErrorMessage error='Error' />);
		expect(getByRole('error')).toBeInTheDocument();
	});
});
