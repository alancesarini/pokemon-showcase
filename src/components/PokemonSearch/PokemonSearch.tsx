import { useState } from 'react';
import { useDebounce } from 'react-use';
import styled from 'styled-components';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Grid from '@mui/material/Grid';

const InputWrapper = styled.div`
	position: relative;
	width: 200px;
`;

const TextInput = styled.input`
	width: 200px;
	height: 30px;
	border: none;
	border-radius: 3px;
	padding-left: 10px;
	padding-right: 20px;
`;

const CancelButton = styled.button`
	position: absolute;
	top: 3px;
	right: -25px;
	border: none;
	background-color: transparent;
	&:hover {
		cursor: pointer;
	}
`;

interface PokemonSearchProps {
	minChars: number;
	onSearch: (value: string) => void;
	onCancel: () => void;
}

const PokemonSearch = (props: PokemonSearchProps): JSX.Element => {
	const [value, setValue] = useState('');
	useDebounce(
		() => {
			if (value.length >= props.minChars) {
				props.onSearch(value);
			}
		},
		500,
		[value]
	);

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	const cancelHandler = () => {
		setValue('');
		props.onCancel();
	};

	return (
		<Grid container justifyContent='center' role={'pokemon-search'}>
			<InputWrapper>
				<TextInput type={'text'} value={value} placeholder={'Type something to search...'} onChange={changeHandler} role={'pokemon-search-input'} />
				{!!value && (
					<CancelButton onClick={cancelHandler} role={'pokemon-cancel-search'}>
						<HighlightOffOutlinedIcon />
					</CancelButton>
				)}
			</InputWrapper>
		</Grid>
	);
};

export default PokemonSearch;
