import React from 'react';
import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';

const mockMovie = {
    imageUrl: 'https://example.com/movie.jpg',
    name: 'The Enthralling Adventure',
    imdbRating: 8.7,
    genres: ['Action'],
    releaseYear: 2023,
    duration: '1h 45min',
    description: 'A captivating story filled with thrills and excitement.',
};
describe('MovieDetails component', () => {
    it('renders movie details when a movie is provided', () => {
        render(<MovieDetails selectedMovie={mockMovie} />);
        expect(screen.getByText(mockMovie.name)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.imdbRating)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.genres)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.releaseYear)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.duration)).toBeInTheDocument();
        expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
        expect(screen.getByRole('imgPoster')).toBeInTheDocument();

        const image = screen.getByRole('imgPoster');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'imgPoster');
    });

    it('renders nothing when no movie is provided', () => {
        render(<MovieDetails />);
        expect(screen.queryByText(mockMovie.name)).not.toBeInTheDocument();
    });
});
