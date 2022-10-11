import { render } from '@testing-library/react';
import LoadingIndicator from './LoadingIndicator';

describe('LoadingIndicator', () => {
	it('should render the loading indicator', () => {
		const { queryByRole } = render(<LoadingIndicator />);
		expect(queryByRole('loading-indicator')).toBeInTheDocument();
	});
});
