import { render } from '@testing-library/react';
import Pagination from './Pagination';

const prevClickHandler = jest.fn();
const nextClickHandler = jest.fn();

const props = {
	showPrevPage: true,
	showNextPage: true,
	onPrevPage: prevClickHandler,
	onNextPage: nextClickHandler
};

describe('Pagination', () => {
	it('should render the pagination with prev and next buttons', () => {
		const { queryByRole } = render(<Pagination {...props} />);
		expect(queryByRole('pagination-prev')).toBeInTheDocument();
		expect(queryByRole('pagination-next')).toBeInTheDocument();
	});

	it('should render the pagination with only the next button', () => {
		props.showPrevPage = false;
		const { queryByRole } = render(<Pagination {...props} />);
		expect(queryByRole('pagination-prev')).toBeNull();
		expect(queryByRole('pagination-next')).toBeInTheDocument();
	});

	it('should render the pagination with only the prev button', () => {
		props.showPrevPage = true;
		props.showNextPage = false;
		const { queryByRole } = render(<Pagination {...props} />);
		expect(queryByRole('pagination-prev')).toBeInTheDocument();
		expect(queryByRole('pagination-next')).toBeNull();
	});

	it('should call the handler for the prev button', () => {
		props.showPrevPage = true;
		props.showNextPage = true;
		const { queryByRole } = render(<Pagination {...props} />);
		const button = queryByRole('pagination-prev') as HTMLButtonElement;
		button.click();
		expect(prevClickHandler).toBeCalled();
	});

	it('should call the handler for the next button', () => {
		props.showPrevPage = true;
		props.showNextPage = true;
		const { queryByRole } = render(<Pagination {...props} />);
		const button = queryByRole('pagination-next') as HTMLButtonElement;
		button.click();
		expect(nextClickHandler).toBeCalled();
	});
});
