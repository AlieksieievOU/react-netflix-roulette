import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import SearchForm from './SearchForm';

describe('Test Search Form Component', () => {
    test('Test that component renders an input with the value equal to initial value passed in props', () => {
        const onSearch = jest.fn((e) => {
        });
        const searchQuery = 'crime';
        render(<SearchForm onSearch={onSearch} searchQuery={searchQuery}/>);
        const input = screen.getByPlaceholderText('What do you want to watch');
        expect(input.getAttribute('value')).toEqual(searchQuery);
    });

    test('Test that after typing to the input and a "click" event on the Submit button, the "onChange" prop is called with proper value', () => {
        const newValue = 'comedy';

        let state = {
            searchQuery: ''
        }

        const handleInputChange = jest.fn((e) => {
            state.searchQuery = e
        });

        const searchQuery = 'crime';

        render(<SearchForm onSearch={handleInputChange} searchQuery={searchQuery}/>);

        const input = screen.getByPlaceholderText('What do you want to watch');
        const submitButton = screen.getByText('Search');

        fireEvent.change(input, { target: { value: newValue } });
        fireEvent.click(submitButton);

        expect(handleInputChange).toHaveBeenCalledTimes(1);
        expect(state.searchQuery).toEqual(newValue);

    })

    test('Test that after typing to the input and pressing Enter key, the "onChange" prop is called with proper value', () => {
        const newValue = 'comedy';

        let state = {
            searchQuery: ''
        }

        const handleInputChange = jest.fn((e) => {
            state.searchQuery = e
        });

        const searchQuery = 'crime';

        render(<SearchForm onSearch={handleInputChange} searchQuery={searchQuery}/>);

        const input = screen.getByPlaceholderText('What do you want to watch');

        fireEvent.change(input, { target: { value: newValue } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13, keyCode: 13, target: { value: newValue } })

        expect(handleInputChange).toHaveBeenCalledTimes(1);
        expect(handleInputChange).toHaveBeenCalledWith(newValue);

    })
});
