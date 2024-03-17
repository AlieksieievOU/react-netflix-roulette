import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from './MovieForm'; // Assuming MovieForm is in the same directory

jest.mock('../../data', () => ({
    GenreListArray: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Comedy' },
    ],
}));

describe('MovieForm component', () => {
    it('renders the form with appropriate fields for adding a movie', () => {
        render(<MovieForm action="add" />);

        expect(screen.getByRole('heading')).toHaveTextContent('ADD MOVIE');
        expect(screen.queryByPlaceholderText('Movie name')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Movie name')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Select Date')).toBeInTheDocument()
        expect(screen.queryByPlaceholderText('https://')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('IMDB Rating')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Duration')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Movie Description')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
    });

    it('renders the form pre-filled with data for editing a movie', () => {
        const mockFormContent = {
            name: 'The Shawshank Redemption',
            releaseYear: 1994,
            imageUrl: 'https://example.com/poster.jpg',
            imdbRating: 9.3,
            genres: ['Action'],
            duration: '142min',
            description: 'A timeless story of hope and redemption.',
        };

        render(<MovieForm action="edit" formContent={mockFormContent} />);
        expect(screen.queryByPlaceholderText('Movie name')).toHaveValue('The Shawshank Redemption');
        expect(screen.queryByPlaceholderText('Select Date')).toHaveValue('1994'); // Input type="date" assumes YYYY-MM-DD format
        expect(screen.queryByPlaceholderText('https://')).toHaveValue('https://example.com/poster.jpg');
        expect(screen.queryByPlaceholderText('IMDB Rating')).toHaveValue('9.3');
        expect(screen.queryByPlaceholderText('Duration')).toHaveValue('142min');
        expect(screen.queryByPlaceholderText('Movie Description')).toHaveValue('A timeless story of hope and redemption.');
    });
});
