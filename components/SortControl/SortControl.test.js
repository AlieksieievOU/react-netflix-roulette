import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortControl from './SortControl';


describe('SortControl component', () => {
    it('renders label, select, and triangle', () => {
        const sortList = [
            { id: 1, name: 'Newest' },
            { id: 2, name: 'Oldest' }
        ];

        render(<SortControl SortControl={sortList} defaultSelectedSortControl={1} />);

        expect(screen.getByTestId('SortControlSelectLabel')).toHaveTextContent('Sort by');
        expect(screen.getByTestId('sortControl')).toBeInTheDocument();
        expect(screen.getByTestId('triangle')).toBeInTheDocument();
    });

    it('updates selected option on change', () => {
        const sortList = [
            { id: 1, name: 'Newest' },
            { id: 2, name: 'Oldest' }
        ];

        render(<SortControl SortControl={sortList} defaultSelectedSortControl={1} />);

        const select = screen.getByTestId('sortControl');
        expect(select.value).toBe('1');

        fireEvent.change(select, { target: { value: '2' } });

        expect(select.value).toBe('2');
    });
});
